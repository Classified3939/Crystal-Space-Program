import {IgtFeatures, IgtWallet} from "incremental-game-template";
import {RedCrystalProducer} from "@/my-game/featuers/crystal-producer/RedCrystalProducer";

export interface MyFeatures extends IgtFeatures {
    wallet: IgtWallet;
    redCrystalProducer : RedCrystalProducer;
}
