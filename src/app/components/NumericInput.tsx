import { Input } from "./ui/input";
import { useState } from "react";

function NumericInput({ value, onChange, ...props }) {
  const handleChange = (e) => {
    const newVal = e.target.value;

    // Allow: empty, -, ., -. or valid float/int
    if (
      newVal === "" ||
      newVal === "-" ||
      newVal === "." ||
      newVal === "-." ||
      /^-?\d*\.?\d*$/.test(newVal)
    ) {
      onChange(newVal);
    }
  };

  return (
    <Input
      inputMode="decimal"
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
}

export { NumericInput }