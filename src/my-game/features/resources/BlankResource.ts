import {SingleLevelUpgrade, Currency, IgtFeature, SaveData} from "incremental-game-template";
import { CurrencyType } from "@/my-game/features/wallet/CurrencyType";
import { CspAddWallet } from "@/components/mixins/CspAddWallet";
import { AbstractResource } from "@/my-game/features/resources/AbstractResource";

export class BlankResource extends AbstractResource{
    
    constructor(){
        super("blank-resource",CurrencyType.blank,CurrencyType.blank);
    }
}