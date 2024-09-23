import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ImageComponent from "../UI/ImageComponent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatName } from "../../utils/typo";
import Loader from "../UI/Loader";

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
	const selectedType1 = useSelector(
		(state) => state.searchParams.selectedTypes.type_1
	);
	const selectedType2 = useSelector(
		(state) => state.searchParams.selectedTypes.type_2
	);

	let content = null;

	const { data, isLoading, error } = useQuery({
		queryKey: ["pokemons", "all"],
		queryFn: fetchPokemons,
	});

	const {
		data: typeData1,
		isLoading: typeLoading1,
		error: typeError1,
	} = useQuery({
		queryKey: ["type", selectedType1],
		queryFn: () => fetchType(selectedType1),
	});

	const {
		data: typeData2,
		isLoading: typeLoading2,
		error: typeError2,
	} = useQuery({
		queryKey: ["type", selectedType2],
		queryFn: () => fetchType(selectedType2),
	});

	if (isLoading || typeLoading1 || typeLoading2) {
		content = <Loader />;
	}

	if (error || typeError1 || typeError2) {
		return (
			<p className="capitalize w-full h-full text-center content-center font-medium">
				Error: {error.message || typeError1.message || typeError2.message}
			</p>
		);
	}

	function findSprite(url) {
		const id = url.split("/").filter(Boolean).pop();

		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
	}

	function filteredPkmByType1() {
		if (typeData1 && typeData1.pokemon) {
			const validPokemon = typeData1.pokemon.map((p) => p.pokemon.name);
			return validPokemon;
		}
	}

	function filteredPkmByType2() {
		if (typeData2 && typeData2.pokemon) {
			const validPokemon = typeData2.pokemon.map((p) => p.pokemon.name);
			return validPokemon;
		}
	}

	if (!isLoading && !typeLoading1 && !typeLoading2) {
		if (pokemonList != data.results) {
			setPokemonList(data.results);
		}

		const excludedForms = [
			"miraidon-",
			"koraidon-",
			"o-totem",
			"-gmax",
			"-vmax",
		];

		const filteredPokemonList = pokemonList.filter((p, i) => {
			const matchesSearch = formatName(p.name).includes(toSearch);

			const isExcludedForm = excludedForms.some((excluded) =>
				p.name.includes(excluded)
			);

			const withinGeneration = selectedGeneration
				? i + 1 >= selectedGeneration.first && i + 1 <= selectedGeneration.last
				: true;

			const matchesType1 = selectedType1
				? filteredPkmByType1().includes(p.name)
				: true;

			const matchesType2 = selectedType2
				? filteredPkmByType2().includes(p.name)
				: true;

			return (
				matchesSearch &&
				!isExcludedForm &&
				withinGeneration &&
				matchesType1 &&
				matchesType2
			);
		});

		content = (
			<>
				<ul className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 p-1">
					{filteredPokemonList.length > 0 &&
						filteredPokemonList.map((pokemon) => (
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
				{filteredPokemonList.length === 0 && (
					<div className="capitalize w-full h-full text-center content-center font-medium">
						no pokemon found with the requested parameters
					</div>
				)}
			</>
		);
	}

	return (
		<div className="overflow-y-auto mt-6 overflow-x-hidden h-full border-4 bg-gradient-to-b from-blue-50 to-[#0DE0F5] rounded-xl border-yellow-400">
			{content}
		</div>
	);
}
