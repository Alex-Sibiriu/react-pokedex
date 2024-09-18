import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ResultsList from "./ResultsList";
import PokeDetails from "./PokeDetails";

function fetchPokemons(identifier) {
	return fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`).then(
		(response) => response.json()
	);
}

export default function SearchResults() {
	const toSearch = useSelector((state) => state.searchParams.toSearch);

	const { data, isLoading, error } = useQuery({
		queryKey: ["pokemons", toSearch],
		queryFn: () => fetchPokemons(toSearch),
	});

	if (isLoading) {
		return (
			<div className="overflow-auto border-4 bg-blue-700 rounded-xl border-yellow-400">
				<p>Loading...</p>;
			</div>
		);
	}

	if (!data) {
		return <p>{`There aren't pokemon for "${toSearch}"`}</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div className="overflow-auto border-4 bg-blue-700 rounded-xl border-yellow-400">
			{toSearch === "" && data.count && <ResultsList count={data.count} />}
			{toSearch !== "" && <PokeDetails pokemon={data} />}
		</div>
	);
}
