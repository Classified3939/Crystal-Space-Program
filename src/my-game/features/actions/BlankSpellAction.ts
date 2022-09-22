import { SpellAction } from "@/my-game/features/actions/SpellAction";

export class BlankSpellAction extends SpellAction{
    constructor(){
        super(0,0,0, "<Blank>");
    }

    gainReward(): void {
        //Empty
    }
}