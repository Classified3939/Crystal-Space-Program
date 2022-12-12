import { Game } from "./my-game/Game";
import { IgtSettings } from "incremental-game-template";
import { AllSkills } from "./my-game/features/Skills/AllSkills";
import { ItemList } from "./my-game/features/Items/ItemList";
import { Inventory } from "./my-game/features/Inventory/Inventory";
import { ActionList } from "./my-game/features/Actions/ActionList";
import { getEventListeners } from "events";
import { AllListeners } from "./my-game/features/Listeners/AllListeners";

export class App {
  static inProduction: boolean = process.env.NODE_ENV === "production";

  static game: Game;

  static start(): void {
    this.game = this.getDefaultGame();
    this.game.initialize();
    this.game.load();
    this.game.start();
  }

  public static getDefaultGame(): Game {
    return new Game({
      settings: new IgtSettings(),
      // Add your own features here.
      skills: new AllSkills(),
      actionList: new ActionList(),
      itemTypes: new ItemList(),
      foodInventory: new Inventory(),
      eventListeners: new AllListeners(),
    });
  }
}
