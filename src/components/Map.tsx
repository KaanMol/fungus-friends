import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import config from "../config";
import {
	Color as MushroomColor,
	Mushroom,
	Spots as MushroomSpots,
} from "../api";

export function Map(props: { markers: Mushroom[] }) {
	return (
		<MapContainer
			center={config.map.center as LatLngExpression}
			zoom={config.map.zoom}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url={
					config.map.provider
						? config.map.provider
						: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				}
			/>

			{props.markers.map((mushroom) => {
				const color =
					MushroomColor[mushroom.color][0] +
					MushroomColor[mushroom.color].toLowerCase().substring(1);
				const spots =
					MushroomSpots[mushroom.spots][0].toUpperCase() +
					MushroomSpots[mushroom.spots].toLowerCase().substring(1);
				return (
					<Marker key={mushroom.name} position={mushroom.latlng}>
						<Popup>
							<div className="property">
								<div className="type">Name</div>
								<div className="value">{mushroom.name}</div>
							</div>
							<div className="property">
								<div className="type">Color</div>
								<div className="value">{color}</div>
							</div>
							<div className="property">
								<div className="type">Spots</div>
								<div className="value">{spots}</div>
							</div>
						</Popup>
					</Marker>
				);
			})}
		</MapContainer>
	);
}
