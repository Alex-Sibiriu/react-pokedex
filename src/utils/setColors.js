export const versionColors = {
	red: "text-white bg-red-600",
	blue: "text-white bg-blue-500",
	yellow: "bg-yellow-400",
	gold: "bg-amber-500",
	silver: "bg-gray-400",
	crystal: "bg-cyan-100",
	ruby: "text-white bg-red-800",
	sapphire: "text-white bg-blue-700",
	emerald: "bg-emerald-500",
	firered: "text-white bg-red-600",
	leafgreen: "bg-green-500",
	diamond: "bg-indigo-200",
	pearl: "bg-pink-300",
	platinum: "bg-gray-500",
	heartgold: "bg-amber-500",
	soulsilver: "bg-gray-400",
	black: "text-white bg-black",
	white: "text-black bg-white",
	"black-2": "text-white bg-gray-800",
	"white-2": "text-black bg-gray-100",
	x: "bg-blue-600",
	y: "bg-pink-500",
	"omega-ruby": "text-white bg-red-800",
	"alpha-sapphire": "text-white bg-blue-700",
	sun: "bg-orange-500",
	moon: "bg-blue-900",
	"ultra-sun": "bg-orange-700",
	"ultra-moon": "bg-blue-900",
	"lets-go-pikachu": "bg-yellow-400",
	"lets-go-eevee": "text-white bg-amber-800",
	sword: "text-white bg-indigo-700",
	shield: "bg-purple-500",
	"brilliant-diamond": "bg-indigo-500",
	"shining-pearl": "bg-pink-300",
	"legends-arceus": "bg-yellow-500",
};

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
