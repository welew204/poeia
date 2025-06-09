"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Delaunay } from 'd3-delaunay';
import { polygonCentroid } from 'd3-polygon';

type CellData = {
  label?: string;
  url?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
};

type TiledButtonGridProps = {
  cellArray: CellData[];
};

export const VoronoiPane: React.FC<TiledButtonGridProps> = ({ cellArray }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [points, setPoints] = useState<[number, number][]>([]);
  const [filledCells, setFilledCells] = useState<CellData[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const colorsArray = ["#d6d3d1", "#a8a29e", "#78716c"];

  // Watch for container size
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

  // Once we know the container size, generate points and filled cells
  useEffect(() => {
    if (size.width === 0 || size.height === 0) return;

    const filled = fillCellArrayWithRandomPoints(cellArray, 50, colorsArray);

    const centerX = size.width / 2
    const centerY = size.height / 2
    const spread = Math.min(size.width, size.height) * 0.8

    const pts: [number, number][] = filled.map((_, i) => {
        if (i < cellArray.length) {
          // This is a "real" user-defined cell
          return [
            centerX + (Math.random() - 0.5) * spread,
            centerY + (Math.random() - 0.5) * spread,
          ];
        } else {
          // This is a random filler cell
          return [
            Math.random() * size.width,
            Math.random() * size.height,
          ];
        }
      });
    setFilledCells(filled);
    setPoints(pts);
  }, [size.width, size.height, cellArray]);

  if (points.length === 0) {
    return <div ref={containerRef} className="w-full h-full relative" />;
  }

  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, size.width, size.height]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size.width} ${size.height}`}
        className="absolute top-0 left-0"
      >
        {points.map(([x, y], i) => {
          const pathData = voronoi.renderCell(i);
          const cellPolygon = voronoi.cellPolygon(i);
          const [centroidX, centroidY] = polygonCentroid(cellPolygon);
          const cell = filledCells[i];

          return (
            <g key={i}>
              {cell.url ? (
                <a 
                    href={cell.url} 
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                  <path
                    d={pathData}
                    fill={cell.color || '#b27041'} // aka bourbon color
                    stroke="white"
                    strokeWidth={hoveredIndex === i ? 6 : 2}
                    className="transition-all duration-300 ease-in-out cursor-pointer hover:stroke-yellow-400"
                  />
                  {cell.label && (
                    <text
                      x={centroidX}
                      y={centroidY}
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
  );
};

function fillCellArrayWithRandomPoints(existingCells: CellData[], totalNumberOfPoints: number, colors: string[]): CellData[] {
  const filledArray = [...existingCells];
  const numberOfRandomPoints = totalNumberOfPoints - existingCells.length;

  for (let i = 0; i < numberOfRandomPoints; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    filledArray.push({
      color: randomColor,
      url: "",
      label: "",
    });
  }
  return filledArray;
}

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
