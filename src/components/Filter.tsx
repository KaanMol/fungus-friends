import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useTransition } from "transition-hook";
import { Color as MushroomColor, Spots as MushroomSpots } from "../api";
import {
	mushroomColorFilterState,
	mushroomSpotsFilterState,
} from "../state/filter";
import { MutliSelector } from "./MultiSelector";

function Sidebar(props: { style: React.CSSProperties; close: () => void }) {
	const [colorState, setColorState] = useRecoilState(
		mushroomColorFilterState
	);

	const [spotsState, setSpotsState] = useRecoilState(
		mushroomSpotsFilterState
	);

	const onColorFilterChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			setColorState([...colorState, Number(event.target.value)]);
		} else {
			setColorState([
				...colorState.filter(
					(color) => color !== Number(event.target.value)
				),
			]);
		}
	};

	const onSpotsFilterChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			setSpotsState([...spotsState, Number(event.target.value)]);
		} else {
			setSpotsState([
				...spotsState.filter(
					(color) => color !== Number(event.target.value)
				),
			]);
		}
	};

	return (
		<div style={props.style} id="sidebar">
			<div className="topbar">
				<div className="title">Filter</div>
				<button onClick={props.close} className="close">
					<span className="material-symbols-outlined">close</span>
				</button>
			</div>

			<div className="filters">
				<MutliSelector
					name="color"
					label="Filter by color"
					onChange={onColorFilterChange}
					inputs={Object.keys(MushroomColor)
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
						})}
					onClear={() => setColorState([])}
					showClear={colorState.length > 0}
				/>

				<MutliSelector
					name="spots"
					label="Filter by spots"
					onChange={onSpotsFilterChange}
					inputs={Object.keys(MushroomSpots)
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
						})}
					onClear={() => setSpotsState([])}
					showClear={spotsState.length > 0}
				/>
			</div>
		</div>
	);
}

export function Filter() {
	const [sidebarVisible, setSidebarVisibility] = useState(false);
	const { stage, shouldMount } = useTransition(sidebarVisible, 300);

	return (
		<>
			<button
				onClick={() => setSidebarVisibility(true)}
				className="sidebar-opener"
			>
				<span className="material-symbols-outlined">filter_alt</span>
			</button>

			{shouldMount && (
				<Sidebar
					style={{
						transition: ".3s",
						transform: {
							from: "translateX(100%)",
							enter: "translateX(0%)",
							leave: "translateX(100%)",
						}[stage],
					}}
					close={() => setSidebarVisibility(false)}
				/>
			)}
		</>
	);
}
