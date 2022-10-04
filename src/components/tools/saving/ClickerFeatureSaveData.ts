import {SaveData} from "incremental-game-template";
import {ClickBonusSaveData} from "@/components/tools/clickers/ClickBonusSaveData";

export interface ClickFeatureSaveData extends SaveData{
    clickers: ClickBonusSaveData[];
}