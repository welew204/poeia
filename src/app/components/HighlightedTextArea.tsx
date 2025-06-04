import { useRef, useState } from "react";

type HighlightedTextareaProps = {
    ingredients: string[];
    stepIndex: number;
    value: string;
    onTextChange: (stepIndex: number, value: string) => void;
  };

const HighlightedTextarea = ({ ingredients, stepIndex, value, onTextChange }: HighlightedTextareaProps) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const highlightText = (text: string) => {
    if (!ingredients.length) return text;

    const words = text.split(/(\s+)/); // Preserve spaces
    return words.map((word, idx) => {
      const cleanWord = word.replace(/[^\w]/g, "").toLowerCase();
      const match = ingredients.find(ing => ing.toLowerCase() === cleanWord);
      if (match) {
        return `<span class="bg-yellow-200 font-semibold">${word}</span>`;
      }
      return word;
    }).join('');
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