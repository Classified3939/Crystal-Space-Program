import { InfoEntry } from "./InfoEntry";
import { InfoEntryId } from "./InfoEntryId";
import { InfoType } from "./InfoType";

export class AllInfo {
    static makeInfo(id: InfoEntryId): InfoEntry {
        const info = new InfoEntry(id, InfoType.Info);
        if (id === InfoEntryId.WelcomeLore) {
            info.setDesc(
                `You awaken in a dimly lit cave, with the instinct that something has gone terribly wrong.\nYou try to remember what, only to find that you have no real memories of… well, anything.\nAfter sitting there for a while, you decide to look for the basics of survival.\nYou can start with collecting the moss that hangs on the cave walls.`
            );
            info.type = InfoType.Lore;
        }
        else if (id === InfoEntryId.WelcomeInfo) {
            info.setDesc(
                `Welcome To [Crystal Space Program]! A time-loop incremental game!\nLet's go over the user interface:\nYour [Skills] will go up while performing [Actions]. Each level of a [Skill] increases the speed of an [Action] by 5%.\n[Actions] are the heart of the game. They have 3 attributes listed: the time it takes to complete, the total exp you gain from doing it, and the [Food] drain multiplier.\nAn [Action]'s color will tell you what kind of [Skill] it grows. Green for physical, blue for mental, red for combat.\n[Food] is what keeps you going! Each action has a food drain per second (except for the first, lucky you), and will be cancelled if you run out.\nAlso, [Food] drain happens over time, so [Skill] levels will help you lose less total food.\nThat was a lot so let's get going!
                `);
        }
        else if (id === InfoEntryId.MossGoal) {
            info.setDesc(`Collect 5 Cave Moss`);
            info.type = InfoType.Goal
        }
        else if (id === InfoEntryId.ExitCaveLore) {
            info.setDesc(
                `You rather hope this moss is edible, seeing as your main alternative is eating rocks. 
                While gathering, you see a thin crevasse leading elsewhere inside the cave. Time to go exploring!`
            );
            info.type = InfoType.Lore;
        }
        else if (id === InfoEntryId.ExitCaveGoal) {
            info.setDesc(`Find an exit, and leave.`);
            info.type = InfoType.Goal
        }
        else if (id === InfoEntryId.AbsorbCrystalLore) {
            info.setDesc(`
            This new room has lots of loose rocks. You notice one specific rock that gives off a warm pink glow.
            You somehow know (remember?) that this is no ordinary rock, but something called a “crystal”.
            Suddenly, you get a very strong instinct to grab the crystal and… meditate? Well, you have nothing better to do.
            `);
            info.type = InfoType.Lore;
        }
        else if (id === InfoEntryId.AbsorbCrystalInfo) {
            info.setDesc(`
            You have absorbed your first [Crystal]. When a [Crystal] is in your inventory you may choose to absorb it to gain some fraction of its power.
            Do note that the more [Crystals] of that color that you have absorbed, the more difficult said absorption will become.
            (yes i am treating infrared as a color, just go with it)
            `);
        }

        return info;
    }
}