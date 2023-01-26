import { Color as MushroomColor, Spots as MushroomSpots } from "./api";

export function colorFilterInput(colorState: MushroomColor[]) {
    return Object.keys(MushroomColor)
        .filter((x) => !(parseInt(x) >= 0))
        .map((color) => {
            return {
                title:
                    color[0] + color.toLowerCase().substring(1),
                value: MushroomColor[
                    color as keyof typeof MushroomColor
                ],
                checked: colorState.includes(
                    MushroomColor[
                    color as keyof typeof MushroomColor
                    ]
                ),
            };
        })
}

export function spotsFilterInput(spotsState: MushroomSpots[]) {
    return Object.keys(MushroomSpots)
        .filter((x) => !(parseInt(x) >= 0))
        .map((spots) => {
            return {
                title:
                    spots[0].toUpperCase() +
                    spots.toLowerCase().substring(1),
                value: MushroomSpots[
                    spots as keyof typeof MushroomSpots
                ],
                checked: spotsState.includes(
                    MushroomSpots[
                    spots as keyof typeof MushroomSpots
                    ]
                ),
            };
        })
}