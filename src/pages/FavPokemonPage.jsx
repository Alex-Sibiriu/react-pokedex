import { useState } from "react";
import FavoriteList from "../components/FavPokemon/FavoriteList";
import LocationSlider from "../components/FavPokemon/LocationSlider";

export default function FavPokemonPage() {
	const [background, setBackground] = useState(
		localStorage.getItem("boxBackground") || "forest"
	);

	function handleBoxBg(bg) {
		localStorage.setItem("boxBackground", bg);

		setBackground(bg);
	}

	return (
		<div className="w-full pt-4">
			<LocationSlider onClick={handleBoxBg} background={background} />
			<FavoriteList background={background} />;
		</div>
	);
}
