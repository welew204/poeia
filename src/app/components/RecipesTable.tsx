import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "./ui/table"
import { Recipe } from ".prisma/client"


const RecipesTable = ({ recipes }: { recipes: Recipe[] }) => {
    return (
        <Table>
        <TableCaption>A list of your concoctions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Recipe</TableHead>
            <TableHead>Elements</TableHead>
            <TableHead>Steps</TableHead>
            <TableHead className="text-right">Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {recipes.map((recipe) => {
                const elementNames = [
                    ...new Set(
                      recipe.steps?.flatMap(step =>
                        step.elements.map(eis => eis.element?.name).filter(Boolean)
                      )
                    )
                  ];
                const elementItems = elementNames.map(el => <li key={el}>{el}</li>)
                return (<TableRow key={recipe.id}>
              <TableCell className="font-medium">{recipe.name}</TableCell>
              <TableCell>
                <ul>
                    {elementItems}
                </ul>
                </TableCell>
              <TableCell>{recipe.steps?.length || 1}</TableCell>
              <TableCell className="text-right">FIVE STARS</TableCell>
            </TableRow>)})}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }
  
  export { RecipesTable }