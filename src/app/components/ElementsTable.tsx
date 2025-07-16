"use client";

import * as React from "react";
import { ColumnFiltersState, SortingState, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
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
import { Element } from ".prisma/client"
import { columns } from "./ElementsColumnDef"; // import our column definitions

const ElementsTable = ({ elements }: { elements: Element[] }) => {
  // Table state for sorting and filtering
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const table = useReactTable({
    data: elements,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getColumnCanGlobalFilter: () => true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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

export { ElementsTable };

/* 
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
                //console.log(recipeNames)
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
      </Table>
    )
  }
  
  export { ElementsTable } */