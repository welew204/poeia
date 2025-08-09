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
import { NumericInput } from './NumericInput'


const ReUpElementDialog = ({
  ariaLabel = 'reup button',
  element,
}) => {
  const [ openDialog, setOpenDialog ] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Button
        onClick={async () => {
          setOpenDialog(true);
        }}
        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground hover:scale-110 transform transition-transform">
        ReUp
      </Button>
      <DialogContent>
        <DialogTitle>ReUp Element</DialogTitle>
        <DialogDescription>
          Refresh your stock of {element.name}
        </DialogDescription>
        <div className="grid grid-cols-1 items-center gap-4">
            <p
              className="text-sm text-muted-foreground mt-2">
                {element.quantity} {element.unit} of {element.name} available
            </p>
            {element.og_quantity ? (
              <p className="text-sm text-muted-foreground mt-2">
                Amount to ReUp: {element.og_quantity} {element.unit}</p>) : (
                    <NumericInput
                        name="quantity"
                        value={1}
                        onChange={(e) => console.log(e.target.value)}
                        placeholder="Enter a number"
                  />
                )}

        <DialogFooter className="sm:justify-center">
            <Button
            className="mt-2"
            onClick={async () => {
                console.log(`ReUp for element: ${element.name}`);
                setOpenDialog(false);
            }}>
            ReUp
            </Button>
        </DialogFooter>
            
        </div>
        {/* { checkedRecipe && recipeIsMakeable ? (
        ) : (checkedRecipe? <h2>Not so fast...</h2> : <p>Click the button to check if you can make this recipe</p>) */}
      </DialogContent>
    </Dialog>
    
  )
}

export { ReUpElementDialog }