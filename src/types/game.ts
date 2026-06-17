export type GamePhase = 'idle' | 'playing' | 'won';

export type TileId = number;

export interface TilePosition {
  readonly row: number;
  readonly column: number;
}

export interface PuzzleTile {
  readonly id: TileId;
  readonly position: TilePosition;
  readonly correctPosition: TilePosition;
  readonly isEmpty: boolean;
}

export interface PuzzleBoard {
  readonly size: number;
  readonly tiles: readonly PuzzleTile[];
}

export interface MoveState {
  readonly moves: number;
  readonly phase: GamePhase;
}
