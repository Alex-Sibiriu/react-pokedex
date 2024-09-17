import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ResultsList from "./ResultsList";

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
		return <p>Loading...</p>;
	}

	if (!data) {
		return <p>{`There aren't pokemon for "${toSearch}"`}</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	if (toSearch === "" && data.count) {
		return <ResultsList count={data.count} />;
	}

	return (
		<div>
			<p>{data.name}</p>
		</div>
	);
}
