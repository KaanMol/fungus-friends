import { useEffect, useState } from "react";
import "./App.scss";
import api from "./utils/api";

import { useRecoilState } from "recoil";
import { Map } from "./components/Map";
import { mushroomSelector } from "./state/mushrooms";
import { Filter } from "./components/Filter";
import { CenterMessage } from "./components/CenterMessage";

function App() {
	const [mushroomState, setMushroomState] = useRecoilState(mushroomSelector);
	// Is used for the loading message
	const [resourcesFetched, setResourcesFetchedState] = useState(false);

	// Fetch resource on mount and store in recoil
	useEffect(() => {
		api().then((mushrooms) => {
			setMushroomState(mushrooms);
			setResourcesFetchedState(true);
		});
	}, [setMushroomState]);

	return (
		<>
			{/* Loading indicator */}
			<CenterMessage
				showIf={resourcesFetched === false}
				message="Loading resources..."
			/>

			{/* Message when combination of filters returns no mushrooms */}
			<CenterMessage
				showIf={mushroomState.length === 0 && resourcesFetched}
				message="Filter didn't return mushrooms"
			/>

			{/* Filter sidebar */}
			<Filter />

			{/* Tilemap */}
			<Map markers={mushroomState} />
		</>
	);
}

export default App;
