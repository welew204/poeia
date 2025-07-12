"use client"

import { ColumnDef } from "@tanstack/react-table"
import { RecipeWithDetails } from "./recipeDetailType" // Adjust the import path as needed
import { MakeRecipeDialog } from "./MakeRecipeDialog";
import { Button } from "./ui/button"; // (if needed for header with sorting icon, etc.)

// Helper to extract unique element names from a recipe
const getElementNames = (recipe: RecipeWithDetails): string[] => {
  // Flatten all element names from all steps, filter out undefined, and remove duplicates
  const names = recipe.steps.flatMap(step =>
    step.elements.map(eis => eis.element?.name).filter(Boolean)
  );
  return Array.from(new Set(names)) as string[];  // cast because filter makes it (string | undefined)[]
};

export const columns: ColumnDef<RecipeWithDetails>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      // Make the "Recipe" column header clickable to toggle sorting (optional)
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Recipe
        </Button>
      );
    },
    cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
    // The default sorting for a string accessor is fine here (recipe names).
  },
  {
    id: "elements",  // no direct accessorKey since it's derived from nested data
    header: "Elements",
    cell: ({ row }) => {
      const elementNames = getElementNames(row.original);
      return (
        <ul>
          {elementNames.map(el => <li key={el}>{el}</li>)}
        </ul>
      );
    },
    accessorFn: row => getElementNames(row),  // produce an array of element names for filtering/sorting
    // Enable filtering: we'll use a custom filter function to allow partial matches on element names
    filterFn: (row, id, filterValue: string) => {
      const elementNames = row.getValue<string[]>(id);
      if (!filterValue) return true; // no filter => include all
      return elementNames.some(name => name.toLowerCase().includes(filterValue.toLowerCase()));
    },
    // Enable sorting: define how to sort the array of element names (e.g. by first name, or by joined string)
    sortingFn: (rowA, rowB, id) => {
      const a = rowA.getValue<string[]>(id).join(", ");
      const b = rowB.getValue<string[]>(id).join(", ");
      return a.localeCompare(b);
    },
  },
  {
    // Show the number of steps in each recipe
    id: "stepsCount",
    header: "Steps",
    accessorFn: recipe => recipe.steps.length,  // number of steps
    cell: ({ getValue }) => getValue<number>(),
    enableSorting: true,
    sortingFn: "basic", // since accessor is a number, basic sorting works (or omit and use default)
  },
  {
    id: "actions",
    header: "Make It!", // empty header for the actions column
    cell: ({ row }) => <MakeRecipeDialog recipe={row.original} />,
    enableSorting: false,
    enableFiltering: false,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ getValue }) => {
      const rating = getValue<number>() ?? "N/A";
      return <span className="text-right">{rating === "N/A" ? "Five Stars" : `${rating} ★`}</span>;
    },
    enableSorting: true,
  },
];