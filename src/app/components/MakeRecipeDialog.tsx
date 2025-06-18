'use client';

import { useState, useEffect } from 'react';
import { Icon } from './Icon'
import { Button } from './ui/button'
import { isRecipeMakeable } from '@/app/pages/main/actions';
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
import { NumericInput } from './NumericInput'

type MakeRecipeIconButtonProps = {
  iconId: string
  recipeId: string
  ariaLabel?: string
  title?: string
  recipe: string
}

const MakeRecipeDialog = ({
  iconId,
  ariaLabel = 'action button',
  title,
  recipe,
}: MakeRecipeIconButtonProps) => {
  const [ numberOfServings, setNumberOfServings ] = useState(1);
  const [ checkedRecipe, setCheckedRecipe ] = useState(false);
  const [ recipeIsMakeable, setRecipeIsMakeable ] = useState(false);

  const handleNumberOfServingsChange = async () => {
      setCheckedRecipe(true);
      const recipeIsMakeable = await isRecipeMakeable(recipe.id, numberOfServings);
      console.log(`Recipe ${recipe.id} is ${recipeIsMakeable.isMakeable? 'makeable' : 'not makeable'}`)
      setRecipeIsMakeable(recipeIsMakeable.isMakeable || false);
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground hover:scale-110 transform transition-transform">
          <Icon id="martini" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Make a Recipe</DialogTitle>
          <DialogDescription>
            Indicate how many servings of the recipe you want to make...
          </DialogDescription>
        <div className="grid grid-cols-2 items-center gap-4">
          <NumericInput
              id={`number-of-servings-${recipe.id}`}
              name="number-of-servings"
              label="Number of Servings"
              onChange={setNumberOfServings}
              value={numberOfServings}
              integerOnly = {true}
            />
          <Button
            className="mt-2"
            onClick={handleNumberOfServingsChange}
            disabled={numberOfServings < 1}>
            Set Number of Servings
          </Button>
        </div>
        { checkedRecipe && recipeIsMakeable ? (
          <h2>BOOM</h2>) : (checkedRecipe? <h2>Not so fast...</h2> : <p>Click the button to check if you can make this recipe</p>)
        }
      </DialogContent>
    </Dialog>
    
  )
}

export { MakeRecipeDialog }