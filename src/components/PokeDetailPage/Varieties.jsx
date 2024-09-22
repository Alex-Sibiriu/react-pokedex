import { useQueries } from "@tanstack/react-query";
import ImageComponent from "../UI/ImageComponent";
import { Link } from "react-router-dom";
import { formatName } from "../../utils/typo";

function fetchPokemonVarieties(name) {
	return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) =>
		response.json()
	);
}

export default function Varieties({ varieties }) {
	const results = useQueries({
		queries: varieties.map((variety) => ({
			queryKey: ["pokemon", variety.pokemon.name],
			queryFn: () => fetchPokemonVarieties(variety.pokemon.name),
		})),
	});

	const isLoading = results.some((result) => result.isLoading);

	const hasError = results.some((result) => result.error);

	const variantWidth = `w-1/${results.length}`;

	const filteredVarieties = results.filter(
		(v) => !v.data?.name.includes("-totem")
	);

	return (
		<section className="text-center">
			<h2 className="font-bold text-xl py-4 pt-8">Varieties</h2>

			<ul className="flex flex-wrap gap-4 justify-evenly py-4 bg-stone-100 mx-auto rounded-lg shadow-inset-border">
				{isLoading ? (
					<li>Loading...</li>
				) : hasError ? (
					<li>There was an error loading the varieties.</li>
				) : (
					filteredVarieties.map((result, i) => (
						<li key={i} className={`capitalize ${variantWidth} `}>
							{result.isLoading ? (
								<span>Loading...</span>
							) : result.error ? (
								<span>{result.error.message}</span>
							) : (
								<Link
									to={`/pokemon/${result.data.name}`}
									className="flex flex-col h-full items-center justify-center"
								>
									{result.data.sprites.front_default && (
										<ImageComponent
											src={result.data.sprites.front_default}
											alt={result.data.name}
											className="bg-ball h-[125px]"
										/>
									)}
									<p className="w-full">{formatName(result.data.name)}</p>
								</Link>
							)}
						</li>
					))
				)}
			</ul>
		</section>
	);
}
