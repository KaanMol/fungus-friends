import { atom, selector } from "recoil";
import { Mushroom } from "../api";
import { mushroomColorFilterState, mushroomSpotsFilterState } from "./filter";

export const mushroomAtom = atom({
    key: 'mushroomAtom',
    default: [] as Mushroom[],
});

export const mushroomSelector = selector({
    key: 'mushroomSelector',
    get: ({ get }) => {
        const colorFilter = get(mushroomColorFilterState);
        const spotsFilter = get(mushroomSpotsFilterState);
        const mushroomList = get(mushroomAtom);

        const hasColorFilters = colorFilter.length > 0;
        const hasSpotsFilters = spotsFilter.length > 0;

        // If no filters are selected, return the unfiltered list directly instead of having unnessecary more code execution
        if (hasColorFilters === false && hasSpotsFilters === false) {
            return mushroomList;
        }

        return mushroomList.filter(mushroom => {
            if (hasColorFilters && hasSpotsFilters) {
                return colorFilter.includes(mushroom.color) && spotsFilter.includes(mushroom.spots);
            } else if (hasColorFilters && hasSpotsFilters === false) {
                return colorFilter.includes(mushroom.color);
            } else {
                return spotsFilter.includes(mushroom.spots)
            }

        })
    },
    set: ({ set }, newValue) => {
        console.log(newValue);
        return set(mushroomAtom, newValue)
    }
});