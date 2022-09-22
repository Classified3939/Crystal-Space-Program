export abstract class SpellAction{
    progress: number;
    goal: number;
    isStarted: boolean;
    spellLevel: number;
    description: string;
    canStart: boolean;

    protected constructor(progress: number, goal: number, spellLevel: number, description: string){
        this.progress = progress;
        this.goal = goal;
        this.isStarted = false;
        this.spellLevel = spellLevel;
        this.description = description;
        this.canStart = true;
    }   

    public start() {
        if (this.isStarted || !this.canStart) {
            console.warn("Cannot cast spell");
            return;
        }
        this.isStarted = true;
        this.progress = 0;
    }

    public tick(delta: number){
        if (!this.isStarted){
            this.start();
            return;
        }
        this.progress = Math.min(this.goal, this.progress + delta);

        if (this.isCompleted()){
            this.complete();
        }
    }

    public isCompleted(): boolean{
        return this.progress >= this.goal
    }

    get timeLeft(){
        return (this.goal - this.progress).toFixed(0);
    }

    public complete() {
        this.gainReward();
        this.progress = 0;
        this.isStarted = false;
    }

    public setSpellLevel(newLevel: number){
        this.spellLevel = newLevel;
    }

    abstract gainReward(): void;
}