import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ImageComponent from "../UI/ImageComponent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatName } from "../../utils/typo";

function fetchPokemons() {
	return fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`).then(
		(response) => response.json()
	);
}

function fetchType(type) {
	if (!type) {
		return null;
	}

	return fetch(`https://pokeapi.co/api/v2/type/${type}`).then((response) =>
		response.json()
	);
}
export default function SearchResults() {
	const [pokemonList, setPokemonList] = useState([]);
	const toSearch = useSelector((state) => state.searchParams.toSearch);
	const selectedGeneration = useSelector(
		(state) => state.searchParams.selectedGeneration
	);
	const selectedType = useSelector((state) => state.searchParams.selectedType);

	const { data, isLoading, error } = useQuery({
		queryKey: ["pokemons", "all"],
		queryFn: fetchPokemons,
	});

	const {
		data: typeData,
		isLoading: typeLoading,
		error: typeError,
	} = useQuery({
		queryKey: ["type", selectedType],
		queryFn: () => fetchType(selectedType),
	});

	if (isLoading || typeLoading) {
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

	function findSprite(url) {
		const index = data.results.findIndex((pokemon) => pokemon.name === name);

		const id = url.split("/").filter(Boolean).pop();

		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
	}

	function filteredPkmByType1() {
		if (typeData && typeData.pokemon) {
			const validPokemon = typeData.pokemon.map((p) => p.pokemon.name);
			return validPokemon;
		}
	}

	const excludedForms = ["miraidon-", "koraidon-", "o-totem", "-gmax", "-vmax"];

	const filteredPokemonList = pokemonList.filter((p, i) => {
		const matchesSearch = p.name.includes(toSearch);

		const isExcludedForm = excludedForms.some((excluded) =>
			p.name.includes(excluded)
		);

		const withinGeneration = selectedGeneration
			? i + 1 >= selectedGeneration.first && i + 1 <= selectedGeneration.last
			: true;

		const matchesType = selectedType
			? filteredPkmByType1().includes(p.name)
			: true;

		return matchesSearch && !isExcludedForm && withinGeneration && matchesType;
	});

	return (
		<div className="overflow-y-auto mt-6 overflow-x-hidden h-full border-4 bg-gradient-to-b from-blue-50 to-[#0DE0F5] rounded-xl border-yellow-400">
			<ul className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 p-1">
				{filteredPokemonList.map((pokemon) => (
					<li key={pokemon.name} className="bg-clip-content">
						<Link
							to={`/pokemon/${pokemon.name}`}
							className="flex flex-col justify-center items-center h-full bg-pkImage"
						>
							<ImageComponent
								src={findSprite(pokemon.url)}
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
		</div>
	);
}
