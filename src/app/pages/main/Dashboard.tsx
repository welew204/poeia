import { db } from "@/db";
import { VoronoiPane } from "@/app/components/VoronoiPane";
import { InteriorLayout } from "@/app/layouts/InteriorLayout";
import { link } from "@/app/shared/links";
import { rainbow } from "@/app/utils";

const Dashboard = async () => {
  const shelfBottleTypes = ["spirit", "fortified wine", "liquer"];
  const spirits = await db.element.findMany({
    where: {
      type: {
        in: shelfBottleTypes,
      },
    },
  });
  //console.log(spirits)
  const spiritPanes = spirits.map((spirit) => ({
    label: spirit.name,
    url: `${link("/main/elements")}?query=${encodeURIComponent(spirit.name)}`,
    color: spirit.colorHex,
  }));
  //console.log(spiritPanes)
  const recipes = await db.recipe.findMany();
  const recipePanes = recipes.map((recipe) => ({
    label: recipe.name,
    url: `${link("/main/recipes")}?query=${encodeURIComponent(recipe.name)}`,
    color: recipe.colorHex || rainbow(),
  }));
  //console.log(recipePanes)
  const totalPanes = recipePanes.concat(spiritPanes);

  return (
    <InteriorLayout>
      <div className="w-full h-[80vh]">
        <VoronoiPane cellArray={totalPanes} />
      </div>
    </InteriorLayout>
  );
};

export { Dashboard };
