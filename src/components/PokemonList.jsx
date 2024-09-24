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
			<ul className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 p-1">
				{list.length > 0 &&
					list.map((pokemon) => (
						<li key={pokemon.name} className="bg-clip-content">
							<Link
								to={`/pokemon/${pokemon.name}`}
								className="flex flex-col justify-center items-center h-full bg-pkImage"
							>
								<ImageComponent
									src={pokemon.url ? findSprite(pokemon.url) : pokemon.sprite}
									alt={`Sprite of ${pokemon.name}`}
									className="p-2 w-full transition-all duration-1000 rounded-sm"
								/>
								<small className="capitalize pb-1 font-medium text-center">
									{formatName(pokemon.name)}
								</small>
							</Link>
						</li>
					))}
			</ul>
			{list.length === 0 && (
				<div className="capitalize w-full h-full text-center content-center font-medium">
					{fallback}
				</div>
			)}
		</>
	);
}
