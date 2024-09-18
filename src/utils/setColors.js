export const typeBackgrounds = {
	normal: "from-normal-light to-normal-dark",
	fire: "from-fire-light to-fire-dark",
	water: "from-water-light to-water-dark",
	grass: "from-grass-light to-grass-dark",
	electric: "from-electric-light to-electric-dark",
	ice: "from-ice-light to-ice-dark",
	fighting: "from-fighting-light to-fighting-dark",
	poison: "from-poison-light to-poison-dark",
	ground: "from-ground-light to-ground-dark",
	flying: "from-flying-light to-flying-dark",
	psychic: "from-psychic-light to-psychic-dark",
	bug: "from-bug-light to-bug-dark",
	rock: "from-rock-light to-rock-dark",
	ghost: "from-ghost-light to-ghost-dark",
	dragon: "from-dragon-light to-dragon-dark",
	dark: "from-dark-light to-dark-dark",
	steel: "from-steel-light to-steel-dark",
	fairy: "from-fairy-light to-fairy-dark",
};

export function setBgColors(types) {
	if (types.length === 1) {
		return (
			`${typeBackgrounds[types[0].type.name]}` || "from-gray-300 to-gray-500"
		);
	} else if (types.length === 2) {
		const fromType = types[0].type.name || "gray-300";
		const toType = types[1].type.name || "gray-500";

		return `from-${fromType} to-${toType}`;
	}
}

export function setStatColor(stat) {
	if (stat === "hp") {
		return typeBackgrounds.grass;
	} else if (stat === "attack") {
		return typeBackgrounds.fire;
	} else if (stat === "defense") {
		return typeBackgrounds.water;
	} else if (stat === "special-attack") {
		return typeBackgrounds.poison;
	} else if (stat === "special-defense") {
		return typeBackgrounds.electric;
	} else if (stat === "speed") {
		return typeBackgrounds.fire;
	}
}
