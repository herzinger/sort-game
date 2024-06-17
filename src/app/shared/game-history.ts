import { GameState } from './game-state';

export interface GameHistory {
  index:  number;
  states: GameState[];

  getCurrentState(): GameState;
  undo():            GameState | undefined;
}
