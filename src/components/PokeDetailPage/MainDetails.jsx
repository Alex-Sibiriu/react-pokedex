import { useState } from "react";
import ImageComponent from "../UI/ImageComponent";
import TypeBadge from "../UI/TypeBadge";

export default function MainDetails({ pokemon, genera }) {
	const [isShiny, setIsShiny] = useState(false);

	const pokeImage = isShiny ? "front_shiny" : "front_default";

	const pokeHeight = pokemon.height.toString().split("").join(",");

	const pokeWeightArray = pokemon.weight.toString().split("");
	const pokeWeight =
		pokeWeightArray.slice(0, -1).join("") + "," + pokeWeightArray.slice(-1);

	const engGenus = genera.find((g) => g.language.name === "en");

	return (
		<section className="flex">
			<div className="h-72 w-1/2">
				<ImageComponent
					src={pokemon.sprites.other["official-artwork"][pokeImage]}
					alt={pokemon.name}
					className="h-full py-2 px-3 rounded-xl bg-stone-100 shadow-inset-border"
				/>
			</div>
			<div className="w-1/2 py-2 flex flex-col justify-between">
				<div className="capitalize text-center">
					<h1 className="font-bold text-2xl">
						#{pokemon.id} {pokemon.name}
					</h1>
					<h5>{engGenus.genus}</h5>
				</div>
				<p>
					<strong>Height: </strong>
					{pokeHeight} m
				</p>
				<p>
					<strong>Weight: </strong>
					{pokeWeight} kg
				</p>

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

				<button
					onClick={() => setIsShiny(!isShiny)}
					className="bg-white w-fit hover:bg-stone-100 transition-all px-2 py-1 my-4 rounded-md"
				>
					Shiny Toggle
				</button>
			</div>
		</section>
	);
}
