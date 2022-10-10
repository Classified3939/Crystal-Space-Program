import {Currency, IgtGame} from "incremental-game-template";
import {Features} from "@/my-game/Features";

export class MyGame extends IgtGame {
[x: string]: any;
    protected readonly SAVE_KEY: string = 'Crystal-Space-Program';
    // @TODO Update TICK_DURATION to an appropriate value
    protected readonly TICK_DURATION: number = 0.05;

    features: Features;

    constructor(features: Features) {
        super();
        this.features = features;
    }

    initialize(): void {
        super.initialize();
        this.features.mainInventory.gainItem(this.features.itemList.infraredCrystal, 1)
    }
}
