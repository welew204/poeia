function isFormValid(formData: FormData, optionalFields: string[] = []): boolean {
    for (const [key, value] of formData.entries()) {
        console.log(key, value)
        if (optionalFields.includes(key)) continue;
    
        // Only treat empty strings or nullish values as invalid
        if (typeof value !== "string" || value.trim() === "" || value.trim() === "0") {
            console.log("offending key, value ->", key, value)
            return false;
        }
    }
    return true;
  }

export { isFormValid }