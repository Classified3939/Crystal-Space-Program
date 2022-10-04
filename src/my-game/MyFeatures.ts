import {IgtFeatures, IgtWallet} from "incremental-game-template";
import { MainCrystal } from "@/my-game/features/mana-storage/MainCrystal";
import { KnowledgeResource } from "@/my-game/features/resources/KnowledgeResource";
import { AllSpells } from "@/my-game/features/spells/AllSpells";
import { ManaResource } from "@/my-game/features/resources/ManaResource";
import { AllCrystals } from "@/my-game/features/resources/crystal-resources/AllCrystals";


export interface MyFeatures extends IgtFeatures {
    wallet: IgtWallet;
    mainCrystal: MainCrystal;
    knowledgeResource: KnowledgeResource;
    manaResource: ManaResource;
    allSpells: AllSpells;
    allCrystals: AllCrystals;
}
