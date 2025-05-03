import { db } from "src/db";
import { InteriorLayout } from "@/app/layouts/InteriorLayout"
import { Button } from "@/app/components/ui/button";
import { RecipesTable } from "@/app/components/RecipesTable"

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

    return (
        <InteriorLayout>
            <div className="mt-2">
                <RecipesTable recipes={recipes}/>
                <div className="px-page-side center mt-2">
                    {/* <h1 className="page-title">All Recipes</h1> */}
                    <div>
                        <Button asChild><a href="#">New Recipe</a></Button>
                    </div>
                </div>
                {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}
            </div>
        </InteriorLayout>
        )
}

export { Recipes }