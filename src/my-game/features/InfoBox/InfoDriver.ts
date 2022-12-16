import { IgtFeature, SaveData } from "incremental-game-template";
import { InfoEntryId } from "./InfoEntryId";
import { AllInfo } from "./AllInfo";
import { InfoType } from "./InfoType";
import { InfoEntry } from "./InfoEntry";
import { Features } from "@/my-game/Features";

export class InfoDriver extends IgtFeature {
    shownInfo: InfoEntryId[];

    constructor() {
        super("info-box")
        this.shownInfo = new Array<InfoEntryId>();
    }

    initialize(features: Features): void {
        this.shownInfo.push(InfoEntryId.WelcomeInfo);
        this.shownInfo.push(InfoEntryId.WelcomeLore);
    }

    addInfo(id: InfoEntryId) {
        this.shownInfo.push(id);
    }

    showInfo(): InfoEntry[] {
        const infoArray = new Array<InfoEntry>();
        for (const id of this.shownInfo) {
            infoArray.push(AllInfo.makeInfo(id));
        }
        return infoArray;
    }

    load(data: SaveData): void {
        //Empty
    }
    save(): SaveData {
        return {}
    }
}