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
import React, { ElementType, useEffect, useRef, useState } from 'react';
import { createRecipe, getElements } from "@/app/pages/main/actions"
import { Element } from "@prisma/client"
import { HighlightedTextarea } from "@/app/components/HighlightedTextArea"
import { isFormValid } from "@/app/utils"

type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

const CreateRecipeDialog = ({elements}: {elements: Element[]}) => {
  const [ title, setTitle ] = useState("")
  const [ colorHex, setColorHex ] = useState("#2596be")
  const [ glasses, setGlasses ] = useState([])
  const [ glassType, setGlassType ] = useState("")
  const [ localElements, setLocalElements ] = useState([])
  const [ ingredients, setIngredients ] = useState<Ingredient[]>([{ name: '', quantity: 0, unit: '' }]);
  const [ steps, setSteps ] = useState<string[]>([''])
  
  const handleSubmit = async (formData: FormData) => {
    // combine all steps into a single string for comparison
    const actualIngredients = ingredients.filter(ing => ing.name !== '');
    const stepsString = steps.join(' ').toLowerCase();
    // check if all ingredients are mentioned in the steps
    const allIngredientsMentioned = actualIngredients.every(ingredient =>
      stepsString.includes(ingredient.name.toLowerCase())
    );
    if (!isFormValid(formData, ["glass"]) || !allIngredientsMentioned) {
      console.log("form data is invalid");
      if (!allIngredientsMentioned) {
        console.log("Not all ingredients are mentioned in the steps.");
      }
      // TODO modify the form view, don't just log an error...
      return;
    }
    const result = await createRecipe(formData, steps);
    if (result.success) {
      window.location.href = `/main/recipes`;
    } else {
      console.error(result.error);
    }
  }

  const updateIngredient = (index: number, field: keyof Ingredient, value: any) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  }

  const updateStep = (index: number, text: string) => {
    const newSteps = [...steps];
    newSteps[index] = text;
    setSteps(newSteps);
  }

  useEffect(() => {
    // filtering out glassware
    const incomingElements = elements.filter(el => el.type !== 'ware')
    const glasses = elements.filter(el => el.type === 'ware')
    setLocalElements(incomingElements)
    setGlasses(glasses)
  }, [])

  useEffect(() => {
    const last = ingredients[ingredients.length - 1]
    if (last?.name && ingredients.filter(i => i.name === '').length === 0) {
      setIngredients([...ingredients, {name: '', quantity: 0, unit: ''}])
    }
  }, [ingredients])

  
  console.log(ingredients)
  console.log(steps)


  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>New Recipe</Button>
        </DialogTrigger>
        <DialogContent className="md">
          <form action={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Recipe</DialogTitle>
              <DialogDescription>
                Add a Recipe! As you do, be sure to include all ingredients, and *mention* those ingredients in the step(s). Click 'Save changes' when you're done.
              </DialogDescription>
            </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                      Name
                  </Label>
                  <input className="col-span-3" type="text" id="name" name="name" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="glass" className="text-right">
                      Glass
                  </Label>
                  <div  className="col-span-2">
                    <Select
                        onValueChange={(value) => setGlassType(value)}
                        name="glass"
                      >
                      <SelectTrigger id="glass" className="w-full">
                        <SelectValue />  
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto">
                        {glasses.map(glass => (
                        <SelectItem key={glass.id} value={glass.name}>
                          {glass.name}
                        </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div  className="flex-col">
                    <Label htmlFor="colorHex" className="">
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
                    className="h-10 w-16 p-1 cursor-pointer"
                  />
                </div>
                <div className="grid">
                  <div  className="flex-col">
                    <Label htmlFor="selectElements" className="">
                        Select Elements
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Add 1 or more
                    </p>
                  </div>
                  {ingredients.map((ingredient, idx) => (
                    <div key={idx} className="flex gap-4 items-center mb-2">
                        <Select
                          className="w-[200px]"
                          value={ingredient.name}
                          name={`ingredient-${idx}`}
                          id={`ingredient-${idx}`}
                          onValueChange={(value) => updateIngredient(idx, 'name', value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />  
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] overflow-y-auto">
                            {localElements.map(el => (
                            <SelectItem key={el.id} value={el.name}>
                              {el.name}
                            </SelectItem>
                            ))}
                          </SelectContent>
                      </Select>
                
                      <NumericInput
                        id={`quantity-${idx}`}
                        name={`quantity-${idx}`}
                        value={ingredient.quantity}
                        onChange={(value) => updateIngredient(idx, 'quantity', value)}
                      />
                  
                      <Select 
                        onValueChange={(value) => updateIngredient(idx, 'unit', value)} 
                        value={ingredient.unit} 
                        name={`unit-${idx}`}
                        >
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
                  ))}
                </div>

                <div className="grid">
                  {steps.map((step, i) => (
                    <div key={i}>
                      <HighlightedTextarea 
                        ingredients={ingredients.map(ing => (ing.name))} 
                        stepIndex={i}
                        value={step}
                        onTextChange={updateStep}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={() => setSteps([...steps, ''])}
                    disabled={steps[steps.length - 1] === '' ? true : false}
                  >
                    Plus Icon
                  </Button>
                </div>
              </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit">Save Recipe</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}

export { CreateRecipeDialog }