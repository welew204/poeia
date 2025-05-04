'use client'

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { NumericInput } from "@/app/components/NumericInput"
import React, { useEffect, useRef, useState } from 'react';


const CreateElementDialog = () => {
  const [ quantity, setQuantity ] = useState(0.0)
  const [ colorHex, setColorHex ] = useState("#2596be")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button asChild><a href="#">New Element</a></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Element</DialogTitle>
          <DialogDescription>
            Add Elements to your bar. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="Vodka, lemon, etc" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="element" className="text-right">
                Type
            </Label>
            <Select>
              <SelectTrigger id="element" className="w-[180px] col-span-3">
                <SelectValue placeholder="Select what type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="spirit">Spirit</SelectItem>
                  <SelectItem value="liquer">Liquer</SelectItem>
                  <SelectItem value="fortified wine">Fortified Wine</SelectItem>
                  <SelectItem value="grocery">grocery</SelectItem>
                  <SelectItem value="dry-good">dry good</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
                Quantity
            </Label>
            <NumericInput 
              value={quantity}
              onChange={setQuantity}
              placeholder="Enter a number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex-col">
              <Label htmlFor="unit" className="text-right">
                  Unit
              </Label>
              <p className="text-sm text-muted-foreground">
                for items, use 'unit(s)'
              </p>
            </div>
            <Select>
              <SelectTrigger id="unit" className="w-[180px] col-span-3">
                <SelectValue placeholder="oz, lb, ml" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Unit</SelectLabel>
                  <SelectItem value="oz">oz</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="units">unit(s)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <div  className="flex-col">
            <Label htmlFor="colorHex" className="text-right">
                Color
            </Label>
            <p className="text-sm text-muted-foreground">
              Optional
            </p>
          </div>
          <Input
            id="colorHex"
            type="color"
            value={colorHex}
            onChange={(e) => setColorHex(e.target.value)}
            /* {...props} */
            className="h-10 w-16 p-1 cursor-pointer"
          />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { CreateElementDialog }