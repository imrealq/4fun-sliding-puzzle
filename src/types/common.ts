export type Nullable<T> = T | null;

export type Coordinate = Readonly<{
  row: number;
  column: number;
}>;

export type GridSize = Readonly<{
  width: number;
  height: number;
}>;
