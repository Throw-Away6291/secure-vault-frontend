import { useState } from 'react';

interface SecurityPatternGridProps {
  selectedCells: number[];
  onCellSelect: (cellIndex: number) => void;
}

const SecurityPatternGrid = ({ selectedCells, onCellSelect }: SecurityPatternGridProps) => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  const cells = Array.from({ length: 16 }, (_, i) => i);

  const getCellStyle = (cellIndex: number) => {
    if (selectedCells.includes(cellIndex)) {
      return 'bg-pattern-selected border-pattern-selected text-white';
    }
    if (hoveredCell === cellIndex) {
      return 'bg-pattern-hover border-pattern-hover text-white';
    }
    return 'bg-pattern-default border-border hover:bg-muted';
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="grid grid-cols-4 gap-2">
        {cells.map((cellIndex) => (
          <button
            key={cellIndex}
            type="button"
            className={`
              aspect-square border-2 rounded-md transition-all duration-200
              flex items-center justify-center font-semibold text-sm
              ${getCellStyle(cellIndex)}
            `}
            onClick={() => onCellSelect(cellIndex)}
            onMouseEnter={() => setHoveredCell(cellIndex)}
            onMouseLeave={() => setHoveredCell(null)}
          >
            {selectedCells.includes(cellIndex) && (
              <span className="text-lg">
                {selectedCells.indexOf(cellIndex) + 1}
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-3 text-center">
        Select exactly 5 cells in your preferred order. This pattern will be used for secure authentication.
      </p>
      <div className="text-center mt-2">
        <span className="text-sm font-medium">
          Selected: {selectedCells.length}/5
        </span>
      </div>
    </div>
  );
};

export default SecurityPatternGrid;