import {MyGame} from "./my-game/MyGame";
import {Currency, IgtSettings, IgtWallet} from "incremental-game-template";
import {CurrencyType} from "@/my-game/features/wallet/CurrencyType"
import { MainCrystal } from "./my-game/features/mana-storage/MainCrystal";
import { KnowledgeResource } from "./my-game/features/resources/KnowledgeResource";
import { AllSpells } from "./my-game/features/spells/AllSpells";
import { ManaResource } from "./my-game/features/resources/ManaResource";
import { AllCrystals } from "./my-game/features/resources/crystal-resources/AllCrystals";

export class App {
    static inProduction: boolean = (process.env.NODE_ENV === "production");

    static game: MyGame;

    static start(): void {
        this.game = this.getDefaultGame();
        this.game.initialize();
        this.game.load();
        this.game.start();
    }

    public static getDefaultGame(): MyGame {
        return new MyGame(
            {
                settings: new IgtSettings(),
                // Add features here.
                wallet : new IgtWallet([CurrencyType.mana, CurrencyType.maxMana, CurrencyType.knowledge, CurrencyType.maxKnowledge, 
                    CurrencyType.infraCrystal,CurrencyType.maxInfra, CurrencyType.redCrystal, CurrencyType.maxRed]),
                mainCrystal : new MainCrystal(),
                manaResource: new ManaResource(),
                knowledgeResource : new KnowledgeResource(),
                allSpells: new AllSpells("spell-list"),
                allCrystals: new AllCrystals("all-crystals"),
            }
        );
    }
}
