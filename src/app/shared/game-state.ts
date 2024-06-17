import { Bottle } from '../bottle/bottle';

export interface GameState {
  board:      Bottle[];
  score:      number;
  isGameOver: boolean;
  isGameWon:  boolean;
}
