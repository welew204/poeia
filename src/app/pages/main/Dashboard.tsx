import { db } from "src/db";
import { VoronoiPane } from "@/app/components/VoronoiPane"
import { InteriorLayout } from "@/app/layouts/InteriorLayout"
import { link } from "@/app/shared/links";

/**
* @param numOfSteps: Total number steps to get color, means total colors
* @param step: The step number, means the order of the color
*/
function rainbow(numOfSteps = 0, step = 0) {
// This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
// Adam Cole, 2011-Sept-14
// HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  var r, g, b;
  if (numOfSteps === 0) {
    numOfSteps = Math.floor(Math.random() * 10 + 5); // default to a random number of steps between 5 and 15
  }
  if (step === 0) {
    step = Math.floor(Math.random() * numOfSteps); // default to a random step
  }
  var h = step / numOfSteps;
  var i = ~~(h * 6);
  var f = h * 6 - i;
  var q = 1 - f;
  switch(i % 6){
      case 0: r = 1; g = f; b = 0; break;
      case 1: r = q; g = 1; b = 0; break;
      case 2: r = 0; g = 1; b = f; break;
      case 3: r = 0; g = q; b = 1; break;
      case 4: r = f; g = 0; b = 1; break;
      case 5: r = 1; g = 0; b = q; break;
      default: r = 0; g = 0; b = 0; break;
  }
  var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
  return (c);
}

const Dashboard = async () => {
    const shelfBottleTypes = ['spirit', 'fortified wine', 'liquer']


    const spirits = await db.element.findMany({
      where: {
        type: {
          in: shelfBottleTypes
        }
      }
    })
    console.log(spirits)
    const spiritPanes = spirits.map((spirit) => (
      {
        label: spirit.name,
        url: link("/main/recipes"),
        color: spirit.colorHex
      }
    ))
    console.log(spiritPanes)
    const recipes = await db.recipe.findMany()
    const recipePanes = recipes.map((recipe) => (
      {
        label: recipe.name,
        url: link("/main/recipes"),
        color: recipe.colorHex || rainbow()
      }
    ))
    console.log(recipePanes)
    const totalPanes = recipePanes.concat(spiritPanes)



    return (
        <InteriorLayout>
            <div className="w-full h-[80vh]">
                <VoronoiPane cellArray={totalPanes} />
            </div>
        </InteriorLayout>
    )
  }
  
  export { Dashboard }