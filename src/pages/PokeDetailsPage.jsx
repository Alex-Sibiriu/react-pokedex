import { useState } from "react";
import ImageComponent from "../components/UI/ImageComponent";
import TypeBadge from "../components/UI/TypeBadge";
import { setBgColors } from "../utils/setColors";
import StatsTab from "../components/PokeDetailPage/StatsTab";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Searchbar from "../components/Searchbar";
import MainDetails from "../components/PokeDetailPage/MainDetails";
import AbilityDetails from "../components/PokeDetailPage/AbilityDetails";
import DexDescriptions from "../components/PokeDetailPage/DexDescriptions";

function fetchPokemon(name) {
	return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) =>
		response.json()
	);
}

function fetchEvolutionChain(name) {
	return fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then(
		(response) => response.json()
	);
}

export default function PokeDetailsPage() {
	const { pokeName } = useParams();

	console.log(pokeName);

	const {
		data: pokemon,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["pokemon", `pokemon-${pokeName}`],
		queryFn: () => fetchPokemon(pokeName),
	});

	const {
		data: evoData,
		isLoading: evoIsLoading,
		error: evoError,
	} = useQuery({
		queryKey: ["evoChain", `pokemon-${pokeName}`],
		queryFn: () => fetchEvolutionChain(pokeName),
	});

	if (isLoading || evoIsLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (evoError) {
		return <div>Error: {evoError.message}</div>;
	}

	return (
		<div className="w-full flex flex-col">
			<Link to={"/"} className="text-white font-bold">
				HOME
			</Link>
			<div
				className={`py-4 w-full h-full overflow-auto mt-4 bg-gradient-to-br border-4 border-yellow-400 rounded-md ${setBgColors(
					pokemon.types
				)}`}
			>
				<MainDetails pokemon={pokemon} genera={evoData.genera} />
				<AbilityDetails pokemon={pokemon} />
				<StatsTab stats={pokemon.stats} />
				<DexDescriptions descriptions={evoData.flavor_text_entries} />
			</div>
		</div>
	);
}
