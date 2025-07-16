'use server'
import { db } from "src/db";

// TODO handle claimsUser...
const frankFurterId = "1aea7045-8358-4e94-a846-14c276010669"

// TODO import from shared types
type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
    id: string;
  };

function getNumberFromFormData(formData: FormData, key: string): number {
    const val = formData.get(key);
    if (typeof val !== "string") {
      throw new Error(`${key} must be a string`);
    }
    const num = parseFloat(val);
    if (isNaN(num)) {
      throw new Error(`${key} must be a valid number`);
    }
    return num;
  }

async function servingsMakeableOfRecipe(recipeId: string): 
    Promise<{ makeableServings: number; error: null | Error }> {
    console.log("Checking if recipe is makeable with id:", recipeId);
    try {
        const recipe = await db.recipe.findUnique({
            where: { id: recipeId },
            include: {
                steps: {
                    include: {
                        elements: {
                            include: {
                                element: true
                                }
                            }
                        }
                    }
            }
        });
        if (!recipe) {
            throw new Error('Recipe not found') 
        };
        //console.log("recipe", recipe)
        // console.log("steps", recipe.steps)
        const recipeElements = recipe.steps.flatMap(step => step.elements);
        // while loop to find the maximum number of servings that can be made
        let makeableServings = 1;
        while (true) {
            for (let e = 0; e < recipeElements.length; e += 1) {
                const recipeElement = recipeElements[e];
                const amtNeeded = recipeElement.qty * makeableServings;
                //console.log(`checking amount of ${recipeElement.element.name}...`, amtNeeded, recipeElement.element.quantity)
                //const convertedInventoryQty = //make a function to convert the inventory quantity to the same unit as the recipe element (should take both as params, but only return the inventoryElementQty converted)
                if (amtNeeded > recipeElement.element.quantity) {
                    if (makeableServings === 1) {
                        return { makeableServings: 0, error: new Error(`Not enough ${recipeElement.element.name} in inventory`) };
                    }
                    console.log(`${recipeElement.element.name} only has enough in inventory to make ${makeableServings - 1} servings`);
                    return { makeableServings: makeableServings - 1, error: null };
                }
            }
            makeableServings += 1;
        }
    } catch (err) {
        return { makeableServings: 0, error: err instanceof Error ? err : new Error(`Unknown error: ${err}`) };
    }
  }

async function decrimentElementQuantity(elementId: string, amount: number): 
    Promise<{ success: true; error: null } | { success: false; error: Error }> {
    try {
        const element = await db.element.findUnique({
            where: { id: elementId }
        });
        if (!element) {
            throw new Error('Element not found');
        }
        if (element.quantity < amount) {
            throw new Error(`Not enough ${element.name} in inventory`);
        }
        await db.element.update({
            where: { id: elementId },
            data: { quantity: element.quantity - amount }
        });
        console.log(`Decremented ${element.name} by ${amount}`);
        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err : new Error(`Unknown error: ${err}`) };
    }
}

async function makeRecipeForGivenServings(recipeId: string, servings: number):
    Promise<{ success: true; error: null } | { success: false; error: Error }> {
    try {
        const recipe = await db.recipe.findUnique({
            where: { id: recipeId },
            include: {
                steps: {
                    include: {
                        elements: {
                            include: {
                                element: true
                            }
                        }
                    }
                }
            }
        });
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        const recipeElements = recipe.steps.flatMap(step => step.elements.map(eis => ({
            name: eis.element.name,
            id: eis.element.id,
            type: eis.element.type,
            qty: eis.qty,
            unit: eis.unit
          })));
        await Promise.all(
            recipeElements.map(async eis => {
                const amtNeeded = eis.qty * servings
                await decrimentElementQuantity(eis.id, amtNeeded)
            })
        )
        // TODO need to think thru "using up" custom elements ...
        console.log(`Making ${servings} servings of recipe ${recipe.name}`);
        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err : new Error(`Unknown error: ${err}`) };
    }
}

async function createElement(formData: FormData): 
    Promise<{ success: true; error: null } | { success: false; error: Error }> {
    try {
        const quantity = getNumberFromFormData(formData, "quantity");
        await db.element.create({
            data: {
                name: formData.get("name") as string,
                type: formData.get("type") as string,
                createdAt: new Date(),
                updatedAt: new Date(),
                quantity: quantity,
                unit: formData.get("unit") as string,
                brand: formData.get("brand") as string,
                user: {
                    connect: {
                        id: frankFurterId
                    }
                }
            }
        }
        )
        console.log(formData)
        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err : new Error('Unknown error') };
    }
  }

const createRecipe = async (formData: FormData, ingredients: Ingredient[], steps: string[]): 
    Promise<{ success: true; error: null } | { success: false; error: Error }> => {
    try {
        console.log(formData)
        console.log(ingredients)
        console.log(steps)
        const recipe = await db.recipe.create({
            data: {
                name: formData.get("name") as string,
                user: {
                    connect: {
                        id: frankFurterId
                    }
                },
                createdAt: new Date(),
                updatedAt: new Date(),
                colorHex: formData.get("colorHex") as string,
                steps: {
                    create: steps.map((step, index) => ({
                        action: step,
                        stepNumber: index + 1,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }))
                },
            }
        });
        // select all steps from above step, then create elementsInSteps for each
        const eisToCreate = [];
        const stepsWithIds = await db.step.findMany({
            where: {
                recipeId: recipe.id
            },});
        for (const step of stepsWithIds) {
            const lowerStep = step.action.toLowerCase();
            const matchingIngredients = ingredients.filter(ing => lowerStep.includes(ing.name.toLowerCase()));
            for (const ingredient of matchingIngredients) {
                eisToCreate.push({
                    stepId: step.id,
                    elementId: ingredient.id,
                    qty: ingredient.quantity,
                    unit: ingredient.unit,
                });
            }
        }
        console.log("eisToCreate", eisToCreate);
        await db.elementInStep.createMany({
            data: eisToCreate,
        });

        return { success: true, error: null };
    } catch (error) {
        console.error(error);
        return { success: false, error: error as Error };
    }
}

async function reupElementQuantity(elementId: string, newQuantity: number): 
    Promise<{ success: true; error: null } | { success: false; error: Error }> {
    try {
        const element = await db.element.findUnique({
            where: { id: elementId }
        });
        if (!element) {
            throw new Error('Element not found');
        }
        const data = { quantity: element.quantity + newQuantity };
        if (element.og_quantity == null) {
            data.og_quantity = newQuantity;
        }
        await db.element.update({
            where: { id: elementId },
            data
        });
        console.log(`Reupped ${element.name} to ${newQuantity}`);
        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err : new Error(`Unknown error: ${err}`) };
    }
}

const getElements = async () => {
    try {
        console.log("getting elements array...")
        const elements = db.element.findMany()
        return { elements, success: true, error: null};
    } catch (error) {
        console.error(error);
        return { success: false, error: error as Error };
    }
}

function serializeRecipe(recipe: any) {
    return {
      ...recipe,
      steps: recipe.steps?.map(step => ({
        ...step,
        elements: step.elements.map(eis => ({
          ...eis,
          qty: eis.qty.toNumber?.() ?? eis.qty, // handle Prisma.Decimal
        })),
      })),
    };
  }

export { createElement, 
    createRecipe, 
    getElements, 
    servingsMakeableOfRecipe, 
    makeRecipeForGivenServings,
    serializeRecipe };