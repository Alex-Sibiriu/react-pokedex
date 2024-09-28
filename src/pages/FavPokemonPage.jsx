import { useState } from "react";
import FavoriteList from "../components/FavPokemon/FavoriteList";
import LocationSlider from "../components/FavPokemon/LocationSlider";

import { locations } from "../utils/locations";

export default function FavPokemonPage() {
	const [background, setBackground] = useState(
		localStorage.getItem("boxBackground") || locations[0]
	);

	function handleBoxBg(bg) {
		localStorage.setItem("boxBackground", bg);

		setBackground(bg);
	}

	return (
		<div className="w-full pt-4">
			<LocationSlider changeLocation={handleBoxBg} background={background} />
			<FavoriteList background={background} />;
		</div>
	);
}
