import { GameState, IgtGame } from "incremental-game-template";
import { Features } from "@/my-game/Features";

export class Game extends IgtGame {
  // @TODO Update SAVE_KEY to something unique
  protected readonly SAVE_KEY: string = "crystal-space-program";
  // @TODO Update TICK_DURATION to an appropriate value
  protected readonly TICK_DURATION: number = 1/60;
  protected delta: number = 0;
  features: Features;
  

  constructor(features: Features) {
    super();
    this.features = features;
  }
}
