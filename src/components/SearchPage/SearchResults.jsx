import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ImageComponent from "../UI/ImageComponent";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SearchResults() {
	const [pokemonList, setPokemonList] = useState([]);
	const toSearch = useSelector((state) => state.searchParams.toSearch);
	const selectedGeneration = useSelector(
		(state) => state.searchParams.selectedGeneration
	);

	function fetchPokemons() {
		return fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`).then(
			(response) => response.json()
		);
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ["pokemons", "all"],
		queryFn: fetchPokemons,
	});

	if (isLoading) {
		return (
			<div className="overflow-auto border-4 bg-blue-700 rounded-xl border-yellow-400">
				<p>Loading...</p>;
			</div>
		);
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	if (pokemonList != data.results) {
		setPokemonList(data.results);
	}

	const ImagesUrl = [];

	for (let i = 0; i < data.results.length; i++) {
		const image = {
			url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
				i + 1
			}.png`,
			pokeName: data.results[i].name,
		};
		ImagesUrl.push(image);
	}

	function findSprite(name) {
		return ImagesUrl.find((sprite) => sprite.pokeName === name);
	}

	return (
		<div className="overflow-y-auto overflow-x-hidden h-full border-4 bg-gradient-to-b from-blue-50 to-[#0DE0F5] rounded-xl border-yellow-400">
			<ul className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 p-1">
				{pokemonList
					.filter(
						(p, i) =>
							p.name.includes(toSearch) &&
							(selectedGeneration
								? i + 1 >= selectedGeneration.first &&
								  i + 1 <= selectedGeneration.last
								: i)
					)
					.map((pokemon) => (
						<li key={pokemon.name} className="bg-clip-content">
							<Link
								to={`/pokemon/${pokemon.name}`}
								className="flex justify-center h-full"
							>
								<ImageComponent
									src={findSprite(pokemon.name).url}
									alt={pokemon.name}
									className="p-2 w-full transition-all duration-1000 rounded-sm bg-pkImage"
								/>
							</Link>
						</li>
					))}
			</ul>
		</div>
	);
}
