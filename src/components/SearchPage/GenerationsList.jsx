import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setGeneration } from "../../store/searchParams";

const generations = {
	"generation-i": { name: "generation-i", first: 1, last: 151 },
	"generation-ii": { name: "generation-ii", first: 152, last: 251 },
	"generation-iii": { name: "generation-iii", first: 252, last: 386 },
	"generation-iv": { name: "generation-iv", first: 387, last: 493 },
	"generation-v": { name: "generation-v", first: 494, last: 649 },
	"generation-vi": { name: "generation-vi", first: 650, last: 721 },
	"generation-vii": { name: "generation-vii", first: 722, last: 809 },
	"generation-viii": { name: "generation-viii", first: 810, last: 905 },
	"generation-ix": { name: "generation-ix", first: 906, last: 1025 },
};

function fetchGenerations() {
	return fetch("https://pokeapi.co/api/v2/generation").then((response) =>
		response.json()
	);
}

export default function GenerationsList() {
	const dispatch = useDispatch();
	const selectedGeneration = useSelector(
		(state) => state.searchParams.selectedGeneration
	);

	function handleClick(gen) {
		dispatch(setGeneration(gen));
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ["generations", 1],
		queryFn: fetchGenerations,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	console.log(selectedGeneration);

	return (
		<ul className="flex gap-1 text-white mt-6 pl-4">
			<li
				onClick={() => handleClick(null)}
				className={`cursor-pointer rounded-t-lg px-2 py-1 font-bold border-4 border-b-0 border-yellow-500 transition-all  uppercase ${
					selectedGeneration
						? "bg-amber-500 hover:bg-yellow-500"
						: "bg-yellow-400"
				}`}
			>
				All
			</li>
			{data.results.map((generation) => (
				<li
					onClick={() => handleClick(generations[generation.name])}
					key={generation.name}
					className={`cursor-pointer rounded-t-lg px-2 py-1 font-bold border-4 border-b-0 border-yellow-500 transition-all uppercase ${
						selectedGeneration && selectedGeneration.name === generation.name
							? "bg-yellow-400"
							: "bg-amber-500 hover:bg-yellow-500"
					}`}
				>
					{generation.name.split("-")[1]}
				</li>
			))}
		</ul>
	);
}
