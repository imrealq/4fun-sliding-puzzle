export function toGridIndex(row: number, column: number, width: number): number {
  return row * width + column;
}

export function toGridPosition(index: number, width: number): { row: number; column: number } {
  return {
    row: Math.floor(index / width),
    column: index % width,
  };
}

export function isWithinGrid(row: number, column: number, size: number): boolean {
  return row >= 0 && column >= 0 && row < size && column < size;
}
