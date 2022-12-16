import { InfoEntryId } from "./InfoEntryId";
import { InfoType } from "./InfoType";

export class InfoEntry {
    id: InfoEntryId;
    type: InfoType;
    desc: string = "";

    constructor(id: InfoEntryId, type: InfoType) {
        this.id = id;
        this.type = type;
    }

    setDesc(desc: string) {
        this.desc = desc;
    }
}