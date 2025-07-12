// RecipesTable.tsx
"use client";

import * as React from "react";
import { ColumnFiltersState, SortingState, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";
import { columns } from "./RecipesColumnDef";    // import our column definitions
import { RecipeWithDetails } from "./recipeDetailType"; // import the type for recipes with details

const RecipesTable = ({ recipes }: { recipes: RecipeWithDetails[] }) => {
  // Table state for sorting and filtering
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<any>([])
  //const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: recipes,
    columns,
    state: { sorting, globalFilter }, // use global filter state
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getColumnCanGlobalFilter: () => true,
    getCoreRowModel: getCoreRowModel(),         // basic row model (no pagination in this example)
    getSortedRowModel: getSortedRowModel(),     // enable client-side sorting
    getFilteredRowModel: getFilteredRowModel(), // enable client-side filtering
  });

  return (
    <div>
      <div className="px-4 py-2 w-full sm:w-1/2 md:w-1/3">
        <input 
          type="text"
          placeholder="Search..."
          value={globalFilter || ""}
          onChange={e => table.setGlobalFilter(String(e.target.value))}
          className="border p-1 rounded text-sm"
        />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : 
                    // Render header content (could be just a title or a sort button as we defined)
                    header.column.columnDef.header && 
                    header.column.columnDef.header instanceof Function
                      ? header.column.columnDef.header({ column: header.column, table })
                      : header.column.columnDef.header
                  }
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {cell.column.columnDef.cell 
                      ? cell.column.columnDef.cell(cell.getContext()) 
                      : flexRender(cell.column.columnDef.cell, cell.getContext())
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-14">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export { RecipesTable };





/* 
'use client'
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
import { MakeRecipeDialog } from "./MakeRecipeDialog"


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
                  return (<TableRow key={recipe.id}>
                <TableCell className="font-medium">{recipe.name}</TableCell>
                <TableCell>
                  <ul>
                      {elementNames.map(el => <li key={el}>{el}</li>)}
                  </ul>
                  </TableCell>
                <TableCell>{recipe.steps?.length || 1}</TableCell>
                <TableCell>
                  <MakeRecipeDialog recipe={recipe}/>
                </TableCell>
                <TableCell className="text-right">FIVE STARS</TableCell>
              </TableRow>)})}
          </TableBody>
        </Table>

    )
  }
  
  export { RecipesTable }
 */
