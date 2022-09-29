import { IgtFeature, IgtFeatures, SaveData } from "incremental-game-template";
import { GainComprehensionSpell } from "@/my-game/features/spells/GainComprehensionSpell";
import { SpellSaveData } from "@/my-game/features/spells/Templates/SpellSaveData";
import { AbstractSpell } from "@/my-game/features/spells/Templates/AbstractSpell";

export class AllSpells extends IgtFeature{

    spellArray: Array<AbstractSpell>;
    saveKey: string;
    id: string;

    constructor(id: string){
        super(id);
        this.id = id;
        this.saveKey = id;
        this.spellArray = new Array<AbstractSpell>();
        this.pushSpells();
    }

    initialize(features: IgtFeatures): void {
        this.spellArray.forEach(element => {
            element.initialize();
        });
    }

    pushSpells(){
        this.spellArray.push(new GainComprehensionSpell());
    }

    save(): Array<SpellSaveData> {
        const dataArray = new Array<SpellSaveData>()
        this.spellArray.forEach(element => {
            dataArray.push(element.save());
        });
        return dataArray;
    }

    update(delta: number): void {
        this.spellArray.forEach(element => {
            if (element.result.isCooldown){
                element.result.tick(delta);
            }
        });
    }

    load(dataArray: Array<SpellSaveData>){
        for (let i = 0; i < this.spellArray.length; i++){
            if (!dataArray[i] == null){
                this.spellArray[i].load(dataArray[i]);
            }
        }
    }
}