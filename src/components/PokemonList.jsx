import { Link } from "react-router-dom";
import { formatName } from "../utils/typo";

import ImageComponent from "./UI/ImageComponent";

export default function PokemonList({ list, fallback }) {
	function findSprite(url) {
		const id = url.split("/").filter(Boolean).pop();

		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
	}

	return (
		<>
			{list.length > 0 && (
				<ul className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 p-1 pb-24">
					{list.map((pokemon, i) => (
						<li
							key={pokemon.name}
							className={`pokelist ${
								!pokemon.url ? "h-40 md:h-[150px] lg:h-32" : ""
							}`}
							style={{ "--i": i }}
						>
							<Link
								to={`/pokemon/${pokemon.name}`}
								className={`flex flex-col justify-center items-center relative p-2 rounded-sm h-full ${
									pokemon.url ? "bg-pkImage" : ""
								} `}
							>
								{!pokemon.url && (
									<div className="poke-shadow absolute w-full h-full"></div>
								)}
								<ImageComponent
									src={pokemon.url ? findSprite(pokemon.url) : pokemon.sprite}
									alt={`Sprite of ${pokemon.name}`}
									className={`w-full pb-1 ${
										!pokemon.url ? "poke-sprite z-10" : ""
									}`}
								/>
								{pokemon.url && (
									<small className="capitalize pb-1 font-medium text-center text-[9px]">
										{formatName(pokemon.name)}
									</small>
								)}
							</Link>
						</li>
					))}
				</ul>
			)}

			{list.length === 0 && (
				<div className="capitalize w-full h-full text-center content-center font-medium">
					{fallback}
				</div>
			)}
		</>
	);
}
