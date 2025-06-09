'use client';

import { useRef, useState } from "react";

type HighlightedTextareaProps = {
    ingredients: string[];
    stepIndex: number;
    value: string;
    onTextChange: (stepIndex: number, value: string) => void;
  };

const HighlightedTextarea = ({ ingredients, stepIndex, value, onTextChange }: HighlightedTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // sliding window approach to highlight ingredients in the text
  const highlightText = (text: string) => {
    if (!ingredients.length) return text;
  
    const sortedIngredients = [...ingredients].sort((a, b) => b.length - a.length); // longest first
    //console.log(sortedIngredients);
    const lowerText = text.toLowerCase();
    let result = '';
    let i = 0;
  
    while (i < text.length) {
      let matchFound = false;
  
      for (const ingredient of sortedIngredients) {
        const ingredientLength = ingredient.length;
        const textWindow = lowerText.slice(i, i + ingredientLength);
  
        if (textWindow === ingredient.toLowerCase()) {
          // Boundary conditions
          const before = i === 0 || /\s/.test(text[i - 1]);
          const after = (i + ingredientLength >= text.length) || /\s|[.,!?]/.test(text[i + ingredientLength]);
  
          if (before && after) {
            // Match found with boundaries!
            const originalText = text.slice(i, i + ingredientLength);
            result += `<span class="bg-yellow-200 font-semibold">${originalText}</span>`;
            i += ingredientLength;
            matchFound = true;
            break;
          }
        }
      }
  
      if (!matchFound) {
        result += text[i];
        i += 1;
      }
    }
  
    return result;
  };

  return (
    <div className="relative w-full">
      {/* Background Highlighted Layer */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none whitespace-pre-wrap p-2 border rounded text-transparent"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: highlightText(value) }}
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          color: 'transparent',
        }}
      />

      {/* Foreground Textarea */}
      <textarea
        ref={textareaRef}
        className="w-full p-2 border rounded bg-transparent relative text-black caret-black"
        style={{
          position: 'relative',
          background: 'transparent',
        }}
        value={value}
        onChange={(e) => onTextChange(stepIndex, e.target.value)}
      />
    </div>
  );
};

export { HighlightedTextarea }