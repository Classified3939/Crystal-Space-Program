import { ContinuousUpgrade, DiscreteUpgrade, IgtAbstractUpgrade, SingleLevelUpgrade } from "incremental-game-template";

export interface UnlockableUpgrade extends IgtAbstractUpgrade{
    unlocked: boolean
    unlock: () => boolean;
}

export interface UnlockableDiscreteUpgrade extends DiscreteUpgrade{
    unlocked: boolean;
    unlock: () => boolean;
}

export interface UnlockableSingleLevelUpgrade extends SingleLevelUpgrade{
    unlocked: boolean;
    unlock: () => boolean;
}

export interface UnlockableContinuousUpgrade extends ContinuousUpgrade{
    unlocked: boolean;
    unlock: () => boolean;
}