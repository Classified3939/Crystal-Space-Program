import { LocationId } from "./Base/LocationId";

export interface LocationDisplay {
    id: LocationId;
    planet: string;
    area: string;
    desc: string;
    subtitle: string;
    contains: string;
}

export const LocationDisplayArray = new Array<LocationDisplay>(
    {
        id: LocationId.MineshaftStartCave,
        planet: "???",
        area: "???",
        desc: "The Beginning.",
        subtitle: "Where am I...",
        contains: "Cave Moss"
    },
    {
        id: LocationId.MineshaftCrystalCave,
        planet: "???",
        area: "???",
        desc: "Cave with a strange glowing mineral deposit.",
        subtitle: "It calls to me, somehow...",
        contains: "1 Infrared Crystal"
    }
)