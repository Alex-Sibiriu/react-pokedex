import { useState } from "react";
import ImageComponent from "../UI/ImageComponent";
import TypeBadge from "../UI/TypeBadge";
import { setBgColors } from "../../utils/setColors";
import StatsTab from "./StatsTab";

export default function PokeDetails({ pokemon }) {
	const [isShiny, setIsShiny] = useState(false);

	const pokeImage = isShiny ? "front_shiny" : "front_default";

	const pokeHeight = pokemon.height.toString().split("").join(",");

	const pokeWeightArray = pokemon.weight.toString().split("");
	const pokeWeight =
		pokeWeightArray.slice(0, -1).join("") + "," + pokeWeightArray.slice(-1);

	function checkAbility(ability) {
		if (ability.is_hidden) {
			return "hidden ability";
		} else if (ability.slot === 1) {
			return "first ability";
		} else if (ability.slot === 2) {
			return "second ability";
		} else if (ability.slot === 3) {
			return "third ability";
		}
	}

	return (
		<div
			className={`py-4 bg-gradient-to-br ${setBgColors(
				pokemon.types
			)} m-4 rounded-md border-outset`}
		>
			<div className="flex w-10/12 mx-auto">
				<div className="h-72 w-1/2">
					<ImageComponent
						src={pokemon.sprites.other["official-artwork"][pokeImage]}
						alt={pokemon.name}
						className="h-full py-2 px-3 bg-blue-600 rounded-xl shadow-inset-border"
					/>
				</div>
				<div className="w-1/2 py-2 flex flex-col justify-between">
					<h1 className="capitalize text-2xl text-center">
						<strong>
							#{pokemon.id} {pokemon.name}
						</strong>
					</h1>
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
			</div>

			<div className="text-center">
				<h2 className="font-bold text-xl py-4">Abilities</h2>

				<ul className="flex justify-evenly py-2 border-2 bg-white w-10/12 mx-auto rounded-lg">
					{pokemon.abilities.map((a) => (
						<li className="capitalize">
							<strong>
								{a.ability.name.includes("-")
									? a.ability.name.replace("-", " ")
									: a.ability.name}
							</strong>
							<span className="capitalize block">{checkAbility(a)}</span>
						</li>
					))}
				</ul>
			</div>

			<div className="text-center w-10/12 mx-auto">
				<h2 className="font-bold text-xl pb-4 pt-8">Base Stats</h2>
				<StatsTab stats={pokemon.stats} />
			</div>
		</div>
	);
}
