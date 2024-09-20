import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function fetchEvoChain(url) {
	return fetch(url).then((response) => response.json());
}

export default function EvolutionChain({ url }) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["evolution-chain", url],
		queryFn: () => fetchEvoChain(url),
	});

	return (
		<section className="text-center">
			<h2 className="font-bold text-xl py-4 pt-8">Evolution Chain</h2>

			<div className="flex justify-evenly py-4 bg-stone-100 mx-auto rounded-lg shadow-inset-border">
				{isLoading ? (
					<li>Loading...</li>
				) : error ? (
					<p>Failed to fetch evolution chain.</p>
				) : data.chain.evolves_to.length < 1 ? (
					<p>This pokemon has no evolutions.</p>
				) : (
					<ul className="flex justify-evenly w-full">
						<li>
							<Link to={`/pokemon/${data.chain.species.name}`}>
								{data.chain.species.name}
							</Link>
						</li>
						{data.chain.evolves_to[0] && (
							<li>
								<Link to={`/pokemon/${data.chain.evolves_to[0].species.name}`}>
									{data.chain.evolves_to[0].species.name}
								</Link>
							</li>
						)}
						{data.chain.evolves_to[0].evolves_to[0] && (
							<li>
								<Link
									to={`/pokemon/${data.chain.evolves_to[0].evolves_to[0].species.name}`}
								>
									{data.chain.evolves_to[0].evolves_to[0].species.name}
								</Link>
							</li>
						)}
					</ul>
				)}
			</div>
		</section>
	);
}
