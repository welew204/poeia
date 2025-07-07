'use client'
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const NumberPicker = ({
    value, 
    updateNumber, 
    negativesAllowed=true}) => {
    
        const setValue = (newValue) => {
        if (negativesAllowed || newValue >= 0) {
            updateNumber(newValue);
        }
    }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => setValue(value - 1)}>-</Button>
      <Input 
        type="number" 
        value={value} 
        onChange={(e) => {setValue(Number(e.target.value))}}
        className="w-20 text-center"
      />
      <Button onClick={() => setValue(value + 1)}>+</Button>
    </div>
  )
}

export { NumberPicker }