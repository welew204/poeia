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
import { Step, Element } from ".prisma/client"


const ElementsTable = ({ elements }: { elements: Element[] }) => {
    return (
        <Table>
        <TableCaption>A list of your elements.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Element</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Recipes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {elements.map((element) => {
                const recipeNames = [
                    ...new Set(
                      element.steps?.flatMap(eis =>
                        eis.step.recipe?.name
                      )
                    )
                  ];
                console.log(recipeNames)
                const recipeItems = recipeNames.map(rec => <li key={rec}>{rec}</li>)
                return (<TableRow key={element.id}>
              <TableCell className="font-medium">{element.name}</TableCell>
              <TableCell>{element.brand != "generic" ? element.brand : ''}</TableCell>
              <TableCell>{element.quantity}</TableCell>
              <TableCell>{element.unit}</TableCell>
              <TableCell>{element.type}</TableCell>
              <TableCell>
                <ul>
                    {recipeItems}
                </ul>
                </TableCell>
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
  
  export { ElementsTable }