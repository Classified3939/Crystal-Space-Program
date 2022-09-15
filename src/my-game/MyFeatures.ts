import {IgtFeatures, IgtWallet} from "incremental-game-template";
import { RedCrystalProducer } from "./features/crystal-producer/RedCrystalProducer";


export interface MyFeatures extends IgtFeatures {
    wallet: IgtWallet;
    redCrystalProducer: RedCrystalProducer
}
