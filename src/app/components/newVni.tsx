import React, { useEffect, useRef, useState } from 'react';
import { Delaunay } from 'd3-delaunay';

type CellData = {
  label?: string;
  url?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
};

type TiledButtonGridProps = {
  container: React.ComponentType<{ children: React.ReactNode }>;
  cellArray: CellData[];
};

export const TiledButtonGrid: React.FC<TiledButtonGridProps> = ({
  container: Container,
  cellArray,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  if (size.width === 0 || size.height === 0) {
    return <div ref={containerRef} className="w-full h-full" />;
  }

  const points = cellArray.map(() => [
    Math.random() * size.width,
    Math.random() * size.height,
  ]);

  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, size.width, size.height]);

  return (
    <Container>
      <div ref={containerRef} className="w-full h-full relative">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${size.width} ${size.height}`}
          className="absolute top-0 left-0"
        >
          {points.map(([x, y], i) => {
            const pathData = voronoi.renderCell(i);
            const cell = cellArray[i];

            return (
              <g key={i}>
                {cell.url ? (
                  <a href={cell.url} target="_blank" rel="noopener noreferrer">
                    <path
                      d={pathData}
                      fill={cell.color || '#a0aec0'}
                      stroke="white"
                      strokeWidth={2}
                    />
                    {cell.label && (
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize={getFontSize(cell.size)}
                        pointerEvents="none"
                      >
                        {cell.label}
                      </text>
                    )}
                  </a>
                ) : (
                  <path
                    d={pathData}
                    fill={cell.color || '#a0aec0'}
                    stroke="white"
                    strokeWidth={2}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </Container>
  );
};

function getFontSize(size?: 'sm' | 'md' | 'lg') {
  switch (size) {
    case 'sm':
      return 10;
    case 'lg':
      return 18;
    case 'md':
    default:
      return 14;
  }
}
