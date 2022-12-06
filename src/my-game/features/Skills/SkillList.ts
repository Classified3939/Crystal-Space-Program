import { Features } from "@/my-game/Features";
import { IgtFeature } from "incremental-game-template";
import { Skill } from "./Skill";
import { SkillId } from "./SkillId";
import { SkillSaveData } from "./SkillSaveData";

export class SkillList extends IgtFeature{

    skills: Skill[];

    constructor(){
        super('skills');
        this.skills = [
            new Skill("Gathering", SkillId.Gathering, "Physical"),
            new Skill("Exploration", SkillId.Exploration, "Physical"),
            new Skill("Extraction", SkillId.Extraction, "Physical"),
            new Skill("Processing", SkillId.Processing, "Physical"),
            new Skill("Construction",SkillId.Construction, "Physical"),

            new Skill("Absorption", SkillId.Absorption, "Mental"),
            new Skill("Perception", SkillId.Perception, "Mental"),
            new Skill("Intelligence", SkillId.Intelligence, "Mental"),
            new Skill("Spell-Casting", SkillId.SpellCasting, "Mental"),
            new Skill("Communication", SkillId.Communication, "Mental"),

            new Skill("Close Combat",SkillId.CloseCombat,"Combat"),
            new Skill("Ranged Combat",SkillId.RangedCombat,"Combat"),
            new Skill("Magic Combat",SkillId.MagicCombat,"Combat"),
        ]
    }

    getSkill(id: SkillId): Skill{
        return this.skills.find(skill => {
            return skill.id === id;
        })!
    }

    getSkillsOfType(type: string): Skill[]{
        return this.skills.filter(skill => {
            return skill.type === type;
        })
    }

    load(data: SkillSaveData): void{
        if (data.skills){
            data.skills.forEach(savedSkill =>{
                const skill = this.getSkill(savedSkill.id);
                if (skill){
                    skill.exp = savedSkill.exp;
                    skill.setReward();
                }
            })
        }
    }

    save(): SkillSaveData{
        const skills = this.skills.map(skill => {
            return {
                id: skill.id,
                exp: skill.exp,
            }
        });
        return{
            skills: skills
        }
    }
}