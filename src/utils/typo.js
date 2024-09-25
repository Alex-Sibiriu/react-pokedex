export const suffixesToRemove = [
	"-three-segment",
	"-full-belly",
	"-hangry",
	"-drive-mode",
	"-gliding-build",
	"-aquatic-mode",
	"-swimming-build",
	"-sprinting-build",
	"-limited-build",
	"-cosplay",
	"-rock-star",
	"-pop-star",
	"-original-cap",
	"-hoenn-cap",
	"-sinnoh-cap",
	"-unova-cap",
	"-kalos-cap",
	"-world-cap",
	"-alola-cap",
	"-partner-cap",
	"-family-of-three",
	"-paldea-combat-breed",
	"-paldea-blaze-breed",
	"-paldea-aqua-breed",
	"-totem-alola",
	"-low-key",
	"-own-tempo",
	"-midnight",
	"-starter",
	"-original",
	"-standard",
	"-zen",
	"-alola",
	"-galar",
	"-vmax",
	"-mega-x",
	"-mega-y",
	"-mega",
	"-gmax",
	"-terastal",
	"-stellar",
	"-ice",
	"-shadow",
	"-hisui",
	"-totem",
	"-battle-bond",
	"-primal",
	"-sky",
	"-land",
	"-complete",
	"-10",
	"-50",
	"-origin",
	"-incarnate",
	"-therian",
	"-crowned",
	"-eternamax",
	"-single-strike",
	"-rapid-strike",
	"-black",
	"-white",
	"-ordinary",
	"-resolute",
	"-aria",
	"-pirouette",
	"-dawn",
	"-midday",
	"-dusk",
	"-dada",
	"-bloodmoon",
	"-female",
	"-male",
	"-sunny",
	"-rainy",
	"-snowy",
	"-normal",
	"-attack",
	"-defense",
	"-speed",
	"-altered",
	"-wellspring-mask",
	"-hearthflame-mask",
	"-cornerstone-mask",
	"-ultra",
	"-solo",
	"-school",
	"-amped",
	"-belle",
	"-phd",
	"-libre",
	"-red-meteor",
	"-orange-meteor",
	"-yellow-meteor",
	"-green-meteor",
	"-blue-meteor",
	"-indigo-meteor",
	"-violet-meteor",
	"-red",
	"-orange",
	"-yellow",
	"-green",
	"-blue",
	"-indigo",
	"-violet",
	"-baile",
	"-pom-pom",
	"-pau",
	"-sensu",
];

export function formatName(name) {
	// suffixesToRemove.forEach((suffix) => {
	// 	name = name.replace(suffix, "");
	// });

	name = name.includes("-") ? name.replace(/-/g, " ") : name;

	name = name.includes("_") ? name.replace(/_/g, " ") : name;

	return name;
}
