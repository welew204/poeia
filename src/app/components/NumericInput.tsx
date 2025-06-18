import { Input } from "./ui/input";

function NumericInput({ value, onChange, integerOnly = false, ...props }) {
  const handleChange = (e) => {
    const newVal = e.target.value;

    // Allow: empty, -, ., -. or valid float/int
    if (integerOnly) {
      // For integer only, allow empty, or valid integer
      if (newVal === "" || /^-?\d*$/.test(newVal)) {
        onChange(newVal);
      }
    } else if (
      newVal === "" ||
      newVal === "." ||
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