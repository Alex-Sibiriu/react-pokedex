import { setBgColors } from "../utils/setColors";
import StatsTab from "../components/PokeDetailPage/StatsTab";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainDetails from "../components/PokeDetailPage/MainDetails";
import AbilityDetails from "../components/PokeDetailPage/AbilityDetails";
import DexDescriptions from "../components/PokeDetailPage/DexDescriptions";
import DetailHeader from "../components/PokeDetailPage/DetailHeader";
import Varieties from "../components/PokeDetailPage/Varieties";
import EvolutionChain from "../components/PokeDetailPage/EvolutionChain";

import { suffixesToRemove } from "../utils/typo";
import Loader from "../components/UI/Loader";

function fetchPokemon(name) {
	return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) =>
		response.json()
	);
}

function fetchSpecies(name) {
	suffixesToRemove.forEach((suffix) => {
		name = name.replace(suffix, "");
	});

	return fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then(
		(response) => response.json()
	);
}

export default function PokeDetailsPage() {
	const { pokeName } = useParams();

	let content = null;

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
		queryFn: () => fetchSpecies(pokeName),
	});

	if (isLoading || evoIsLoading) {
		content = <Loader />;
	}

	if (pokemon && evoData) {
		const filteredVarieties = evoData.varieties.filter(
			(v) => !v.pokemon.name.includes("-totem")
		);

		content = (
			<div className="w-full pb-8">
				<DetailHeader id={evoData.id} />
				<MainDetails
					pokemon={pokemon}
					genera={evoData?.genera}
					dexNum={evoData.pokedex_numbers[0].entry_number}
				/>
				<AbilityDetails pokemon={pokemon} />
				{evoData && filteredVarieties?.length > 1 && (
					<Varieties varieties={evoData.varieties} />
				)}
				<EvolutionChain url={evoData.evolution_chain.url} />
				{evoData && (
					<DexDescriptions descriptions={evoData.flavor_text_entries} />
				)}
				<StatsTab key={pokemon.name} stats={pokemon.stats} />
			</div>
		);
	}

	if (error || evoError) {
		content = <div>Error: {error.message || evoError.message}</div>;
	}

	return (
		<div
			className={`w-full h-full pt-1 transition-all duration-700 mt-4 bg-gradient-to-br border-4 border-b-0 border-yellow-400 rounded-md ${
				isLoading || evoIsLoading ? "overflow-hidden" : "overflow-y-auto"
			} ${setBgColors(pokemon?.types)}`}
		>
			{content}
		</div>
	);
}
