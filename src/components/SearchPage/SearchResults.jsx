import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ImageComponent from "../UI/ImageComponent";

function fetchPokemons() {
	return fetch(`https://pokeapi.co/api/v2/pokemon`).then((response) =>
		response.json()
	);
}

export default function SearchResults() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["pokemons", "all"],
		queryFn: fetchPokemons,
	});

	if (isLoading) {
		return (
			<div className="overflow-auto border-4 bg-blue-700 rounded-xl border-yellow-400">
				<p>Loading...</p>;
			</div>
		);
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	const ImagesUrl = [];

	for (let i = 0; i < data.count; i++) {
		const image = {
			url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
				i + 1
			}.png`,
			dexNum: i + 1,
		};
		ImagesUrl.push(image);
	}

	return (
		<div className="overflow-auto border-4 bg-blue-700 rounded-xl border-yellow-400">
			<ul className="flex flex-wrap">
				{ImagesUrl.map((image) => (
					<li
						key={image.dexNum}
						className="w-full min-[450px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 circle-light"
					>
						<Link to={`/pokemon/${image.dexNum}`}>
							<ImageComponent
								src={image.url}
								alt={image.dexNum}
								className="p-4"
							/>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
