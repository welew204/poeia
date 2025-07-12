'use client';

import { useState, useEffect } from 'react';
import { Icon } from './Icon'
import { Button } from './ui/button'
import { servingsMakeableOfRecipe, makeRecipeForGivenServings } from '@/app/pages/main/actions';
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
import { NumberPicker } from './NumberPicker'
import { Recipe } from ".prisma/client"

type MakeRecipeIconButtonProps = {
  iconId: string
  recipeId: string
  ariaLabel?: string
  title?: string
  recipe: Recipe
}

const MakeRecipeDialog = ({
  iconId,
  ariaLabel = 'action button',
  title,
  recipe,
}: MakeRecipeIconButtonProps) => {
  const [ openDialog, setOpenDialog ] = useState(false);
  const [ numberOfServings, setNumberOfServings ] = useState(1);
  const [ possibleServings, setPossibleServings ] = useState(1);
  const [ recipeWarning, setRecipeWarning ] = useState(false);
  
  const handleCheckServings = async () => {
      const recipeServingsPossible = await servingsMakeableOfRecipe(recipe.id);
      console.log(`Recipe ${recipe.id} can be made into ${recipeServingsPossible.makeableServings} servings`);
      setPossibleServings(recipeServingsPossible.makeableServings);
    }


  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Button
        onClick={async () => {
          await handleCheckServings();
          setOpenDialog(true);
        }}
        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground hover:scale-110 transform transition-transform">
        <Icon id="martini" />
      </Button>
      <DialogContent>
        <DialogTitle>Make a Recipe</DialogTitle>
        <DialogDescription>
          Indicate how many servings of the recipe you want to make...
        </DialogDescription>
        <div className="grid grid-cols-2 items-center gap-4">
          <NumberPicker 
            value={numberOfServings}
            updateNumber={(servings: number) => {
              if (servings > possibleServings) {
                setNumberOfServings(possibleServings);
                setRecipeWarning(true);
              } else {
                setRecipeWarning(false);
                setNumberOfServings(servings >= 1 ? servings : 1);
              }
            }}
            negativesAllowed={false}
          />
        </div>
        {recipeWarning && (
          <p className="text-red-500 text-sm mt-2 ">
            Warning: You can only make {possibleServings} servings of this recipe with your current inventory.
          </p>
        )}
        <div>
            {recipe.steps.map((step, index) => (
              <div key={index} className="mt-2">
                <Icon id="check" className="inline mr-2" />
                <strong>Step {index + 1}:</strong> {step.action}
                <div
                  className="flex"
                >
                  <ul className="list-disc ml-6">
                    {step.elements.map((element, idx) => (
                      <li key={idx}>
                        {element.element.name} - {element.qty * numberOfServings} {element.element.unit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <DialogFooter className="sm:justify-center">
              <Button
                className="mt-2"
                onClick={async () => {
                  await makeRecipeForGivenServings(recipe.id, numberOfServings);
                  setOpenDialog(false);
                  // Here you would typically call an API to mark the recipe as made
                }}
                disabled={numberOfServings > possibleServings}>
                Mark As Made
              </Button>
            </DialogFooter>
            <p
              className="text-sm text-muted-foreground mt-2">
              This will handle updating your inventory based on the number of servings
            </p>
        </div>
        {/* { checkedRecipe && recipeIsMakeable ? (
        ) : (checkedRecipe? <h2>Not so fast...</h2> : <p>Click the button to check if you can make this recipe</p>) */}
      </DialogContent>
    </Dialog>
    
  )
}

export { MakeRecipeDialog }