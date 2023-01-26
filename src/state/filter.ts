import { atom } from "recoil";
import { Color as MushroomColor, Spots as MushroomSpots } from "../utils/api";

export const mushroomColorFilterState = atom({
    key: 'mushroomColorFilterState',
    default: [] as MushroomColor[],
});

export const mushroomSpotsFilterState = atom({
    key: 'mushroomSpotsFilterState',
    default: [] as MushroomSpots[],
});