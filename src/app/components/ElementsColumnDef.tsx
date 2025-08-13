import { ColumnDef } from "@tanstack/react-table";
//import { } from ".elementDetailType";
// import the re-up dialog if/when needed
import { Button } from "./ui/button";
import { Element } from "@generated/prisma/client";
import { ReUpElementDialog } from "./ReUpDialog";

export const columns: ColumnDef<Element>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Element
        </Button>
      );
    },
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <ReUpElementDialog element={row.original} />
          <Button
            onClick={() => {
              console.log(`Action for element: ${row.original.name}`);
              // Handle action, e.g. open a dialog or perform an action
              // check if Element has a quantity, and an og_quantity
              // dialog that populates what it has
              // input box to add a new og_quantity
              // guidance to say (cannot edit this og_quantity -> make a different element if desired)
            }}
          >
            Mark As Used Up
          </Button>
          {/* 
                    <Button
                        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground hover:scale-110 transform transition-transform"
                        onClick={() => {
                            // Handle action, e.g. open a dialog or perform an action
                            console.log(`Action for element: ${row.original.name}`);
                        }}
                    >
                        Mark As Used
                    </Button> */}
        </div>
      );
    },
  },
  {
    id: "recipes",
    header: "Recipes",
    cell: ({ row }) => {
      const recipeNames = [
        ...new Set(row.original.steps?.flatMap((eis) => eis.step.recipe?.name)),
      ];
      return (
        <ul>
          {recipeNames.map((rec) => (
            <li key={rec}>{rec}</li>
          ))}
        </ul>
      );
    },
    enableSorting: true,
    enableFiltering: true,
  },
];
