export function toGridIndex(row: number, column: number, width: number): number {
  return row * width + column;
}
