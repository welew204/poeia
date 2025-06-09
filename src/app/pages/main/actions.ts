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
                    /* element: {
                        connect: {
                            id: ingredient.id
                        }
                    },
                    step: {
                        connect: {
                            id: step.id
                        }
                    }, */
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

export { createElement, createRecipe, getElements }