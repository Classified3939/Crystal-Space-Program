export abstract class SpellAction{
    progress: number;
    goal: number;
    isCooldown: boolean;
    spellLevel: number;
    description: string;

    protected constructor(progress: number, goal: number, spellLevel: number, description: string){
        this.progress = progress;
        this.goal = goal;
        this.isCooldown = false;
        this.spellLevel = spellLevel;
        this.description = description;
    }   

    public start() {
        if (this.isCooldown || !this.canStart()) {
            console.warn("Cannot cast spell");
            return;
        }
        this.gainReward();
        this.isCooldown = true;
        this.progress = 0;
    }

    public tick(delta: number){
        this.progress = Math.min(this.goal, this.progress + delta);

        if (this.isCompleted()){
            this.complete();
        }
    }

    public isCompleted(): boolean{
        return this.progress >= this.goal
    }

    public getTimeLeft(){
        return (this.goal - this.progress).toFixed(2);
    }

    public complete() {
        this.progress = 0;
        this.isCooldown = false;
    }

    public setSpellLevel(newLevel: number){
        this.spellLevel = newLevel;
    }

    abstract gainReward(): void;

    abstract canStart(): boolean;
}