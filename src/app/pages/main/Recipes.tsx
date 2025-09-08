import { db } from "@/db";
import { InteriorLayout } from "@/app/layouts/InteriorLayout";
import { Button } from "@/app/components/ui/button";
import { RecipesTable } from "@/app/components/RecipesTable";
import { CreateRecipeDialog } from "@/app/components/CreateRecipeDialog";
import { serializeRecipe } from "@/app/pages/main/actions";

const Recipes = async ({ request }: { request: Request }) => {
  const recipes = await db.recipe.findMany({
    include: {
      steps: {
        include: {
          elements: {
            include: {
              element: true,
            },
          },
        },
      },
    },
  });
  const recipesSerialized = recipes.map(serializeRecipe);

  const elements = await db.element.findMany();

  const url = new URL(request.url);
  const search = url.searchParams.get("query") || "";

  return (
    <InteriorLayout page="recipes">
      <div className="mt-2">
        <RecipesTable recipes={recipesSerialized} initialSearch={search} />
        <div className="px-page-side center mt-2">
          <CreateRecipeDialog elements={elements} />
        </div>
        {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}
      </div>
    </InteriorLayout>
  );
};

export { Recipes };
