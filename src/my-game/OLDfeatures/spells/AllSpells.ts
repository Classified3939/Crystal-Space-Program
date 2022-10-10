import { IgtFeature } from "incremental-game-template";
import { GainComprehensionSpell } from "@/my-game/features/spells/GainComprehensionSpell";
import { SpellSaveData } from "@/my-game/features/spells/Templates/SpellSaveData";
import { AbstractSpell } from "@/my-game/features/spells/Templates/AbstractSpell";
import { GainCrystalSpell } from "./GainCrystalSpell";
import { MyFeatures } from "@/my-game/Features";
import { AbsorbInfraredSpell } from "./AbsorbInfraredSpell";
import { AbsorbRedSpell } from "./AbsorbRedSpell";

export class AllSpells extends IgtFeature{

    spellArray: Array<AbstractSpell>;
    crystalSpellArray: Array<AbstractSpell>;
    saveKey: string;
    id: string;

    constructor(id: string){
        super(id);
        this.id = id;
        this.saveKey = id;
        this.spellArray = new Array<AbstractSpell>();
        this.crystalSpellArray = new Array<AbstractSpell>();
        this.pushSpells();
    }

    initialize(features: MyFeatures): void {
        features.allCrystals.crystalArray.forEach(element => {
            this.crystalSpellArray.push(new GainCrystalSpell(element))
        });
        this.spellArray.forEach(element => {
            element.initialize();
        });
        this.crystalSpellArray.forEach(element => {
            element.initialize();
        });
    }

    pushSpells(){
        this.spellArray.push(new GainComprehensionSpell());
        this.spellArray.push(new AbsorbInfraredSpell());
        this.spellArray.push(new AbsorbRedSpell());
    }

    save(): Array<SpellSaveData> {
        const dataArray = new Array<SpellSaveData>()
        this.spellArray.forEach(element => {
            dataArray.push(element.save());
        });
        return dataArray;
    }

    update(delta: number): void {
        this.updateSpellArray(delta, this.spellArray);
        this.updateSpellArray(delta, this.crystalSpellArray);
    }

    updateSpellArray(delta: number, array: Array<AbstractSpell>): void{
        array.forEach(element => {
            if (element.result.isCooldown){
                element.result.tick(delta);
            }
            if (!element.unlocked){
                element.unlock();
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