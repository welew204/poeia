import { db } from "src/db";
import { InteriorLayout } from "@/app/layouts/InteriorLayout"
import { Button } from "@/app/components/ui/button";
import { RecipesTable } from "@/app/components/RecipesTable"
import { CreateRecipeDialog } from "@/app/components/CreateRecipeDialog"

const Recipes = async () => {
    const recipes = await db.recipe.findMany({
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
    })

    const elements = await db.element.findMany()

    return (
        <InteriorLayout>
            <div className="mt-2">
                <RecipesTable recipes={recipes}/>
                <div className="px-page-side center mt-2">
                    {/* <h1 className="page-title">All Recipes</h1> */}
                    <CreateRecipeDialog elements={elements}/>
                </div>
                {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}
            </div>
        </InteriorLayout>
        )
}

export { Recipes }