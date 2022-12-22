import { ContinuousExpLevel } from "incremental-game-template";
import { SkillId } from "@/my-game/Features/Skills/SkillId";
import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events"

export class Skill extends ContinuousExpLevel {
    name: string;
    id: SkillId;
    type: string;
    reward: number;

    protected _onLevelUp = new SimpleEventDispatcher<Skill>();

    constructor(name: string, id: SkillId, type: string) {
        super(1000, (level) => {
            return Math.round(((1.1 ** level - 1) * 100) * 100) / 100
        });

        this.name = name;
        this.id = id
        this.type = type;
        this.reward = 1.05 ** this.getLevel();
    }

    public get onLevelUp(): ISimpleEvent<Skill> {
        return this._onLevelUp.asEvent();
    }

    setReward(): void {
        this.reward = 1.05 ** this.getLevel();
    }

    gainExperience(amount: number): void {
        const oldLevel: number = this.getLevel();
        const newExp = Math.round((this.exp + amount) * 1e7) / 1e7;
        this.exp = Math.ceil((newExp) * 1e6) / 1e6;
        const newLevel: number = this.getLevel();
        if (newLevel > oldLevel) {
            this._onLevelUp.dispatch(this);
        }
    }
}