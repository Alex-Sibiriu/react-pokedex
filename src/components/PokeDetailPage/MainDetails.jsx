import { useEffect, useState } from "react";
import ImageComponent from "../UI/ImageComponent";
import TypeBadge from "../UI/TypeBadge";
import { formatName } from "../../utils/typo";
import ShinyStars from "../UI/ShinyStars";

export default function MainDetails({ pokemon, genera = "", dexNum }) {
	const [isShiny, setIsShiny] = useState(false);

	let pokeImage = isShiny ? "front_shiny" : "front_default";

	useEffect(() => {
		setIsShiny(false);
	}, [pokemon]);

	function toggleShiny() {
		setIsShiny(!isShiny);
	}

	const pokeHeightArray = pokemon.height.toString().split("");
	const pokeHeight =
		pokeHeightArray.slice(0, -1).join("") + "," + pokeHeightArray.slice(-1);

	const pokeWeightArray = pokemon.weight.toString().split("");
	const pokeWeight =
		pokeWeightArray.slice(0, -1).join("") + "," + pokeWeightArray.slice(-1);

	const engGenus =
		genera != "" ? genera.find((g) => g.language.name === "en") : "";

	return (
		<section className="flex justify-between">
			<div className="h-72 w-5/12 relative select-none">
				{pokemon.sprites.other["official-artwork"].front_shiny && (
					<ShinyStars isShiny={isShiny} onClick={toggleShiny} />
				)}
				<ImageComponent
					src={pokemon.sprites.other["official-artwork"][pokeImage]}
					alt={pokemon.name}
					className="w-full aspect-square py-4 px-3 rounded-xl bg-stone-100 shadow-inset-border"
				/>
			</div>
			<div className="w-1/2 py-2 mb-8 flex flex-col justify-between">
				<div className="capitalize text-center">
					<h1 className="font-bold text-2xl">
						#{dexNum} {formatName(pokemon.name)}
					</h1>
					<h5>{engGenus.genus}</h5>
				</div>
				<div className="flex items-center gap-2 capitalize">
					<strong>Type{pokemon.types.length > 1 ? "s" : ""}: </strong>
					<ul className="flex gap-2">
						{pokemon.types.map((t) => (
							<li key={t.type.name}>
								<TypeBadge type={t.type.name} />
							</li>
						))}
					</ul>
				</div>
				<p>
					<strong>Height: </strong>
					{pokeHeight} m
				</p>
				<p>
					<strong>Weight: </strong>
					{pokeWeight} kg
				</p>
				<p>
					<strong>Gender Rate: </strong>
				</p>
			</div>
		</section>
	);
}
