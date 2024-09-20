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

const suffixesToRemove = [
	"-standard",
	"-zen",
	"-alola",
	"-galar",
	"-totem-alola",
	"-vmax",
	"-mega-x",
	"-mega-y",
	"-mega",
	"-gmax",
	"-terastal",
	"-stellar",
	"-ice",
	"-shadow",
	"-paldea-combat-breed",
	"-paldea-blaze-breed",
	"-paldea-aqua-breed",
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
	"-male",
	"-female",
	"-sunny",
	"-rainy",
	"-snowy",
	"-normal",
	"-attack",
	"-defense",
	"-speed",
	"-altered",
];

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
				className={`pb-4 pt-1 w-full h-full overflow-auto mt-4 bg-gradient-to-br border-4 border-yellow-400 rounded-md ${setBgColors(
					pokemon.types
				)}`}
			>
				<DetailHeader id={evoData.id} />
				<MainDetails
					pokemon={pokemon}
					genera={evoData?.genera}
					dexNum={evoData.pokedex_numbers[0].entry_number}
				/>
				<AbilityDetails pokemon={pokemon} />
				{evoData && evoData.varieties?.length > 1 && (
					<Varieties varieties={evoData.varieties} />
				)}
				<EvolutionChain url={evoData.evolution_chain.url} />
				{evoData && (
					<DexDescriptions descriptions={evoData.flavor_text_entries} />
				)}
				<StatsTab stats={pokemon.stats} />
			</div>
		</div>
	);
}
