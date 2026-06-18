export type TileId = number;

export type TilePosition = Readonly<{
  row: number;
  column: number;
}>;

export type PuzzleTile = Readonly<{
  id: TileId;
  position: TilePosition;
  correctPosition: TilePosition;
  isEmpty: boolean;
}>;

export type PuzzleBoard = Readonly<{
  rows: number;
  cols: number;
  tiles: readonly PuzzleTile[];
}>;

export type PuzzleMove = Readonly<{
  tileId: TileId;
  from: TilePosition;
  to: TilePosition;
}>;
