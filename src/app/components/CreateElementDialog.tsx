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
  DialogClose,
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
import { createElement } from "@/app/pages/main/actions"
import { isFormValid } from "@/app/utils"

const CreateElementDialog = () => {
  const [ quantity, setQuantity ] = useState(Number)
  const [ colorHex, setColorHex ] = useState("#2596be")
  const [ name, setName ] = useState("")
  const [ brand, setBrand ] = useState("")
  const [ type, setType ] = useState("")
  const [ unit, setUnit ] = useState("")
  console.log(type)

  const handleSubmit = async (formData: FormData) => {
    // TODO make sure 'Select' type fields, as well as quantity will correctly fail if no option is selected
    if (!isFormValid(formData, ["brand", "colorHex"])) {
      console.error("form data is invalid");
      // TODO modify the form view, don't just log an error...
      return;
    }

    const result:
    | { success: true; error: null }
    | { success: false; error: Error } = await createElement(formData);

    if (result.success) {
      setName("")
      setQuantity(0)
      setType("")
      setBrand("")
      setColorHex("#2596be")
      setUnit("")
      window.location.href = `/main/elements`;
    } else {
      console.error(result.error);
    }
  }

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>New Element</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Element</DialogTitle>
              <DialogDescription>
                Add Elements to your bar. Click 'Save changes' when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="element" className="text-right">
                    Type
                </Label>
                <Select onValueChange={(val) => setType(val)} value={type} name="type">
                  <SelectTrigger id="type" className="w-[180px] col-span-3">
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
                  name="quantity"
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
                <Select onValueChange={(val) => setUnit(val)} value={unit} name="unit">
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
                  <Label htmlFor="brand" className="text-right">
                      Brand
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Optional
                  </p>
                </div>
                  <input type="text" id="brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
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
                  name="colorHex"
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
              <DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}

export { CreateElementDialog }