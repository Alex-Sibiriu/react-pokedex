import { useQuery } from "@tanstack/react-query";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ImageComponent from "../UI/ImageComponent";
import { Link } from "react-router-dom";

import { formatName } from "../../utils/typo";

function fetchPokemon(id) {
	if (id < 0 || id > 1025) {
		return null;
	}
	return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
		response.json()
	);
}

export default function DetailHeader({ id }) {
	const {
		data: prevData,
		isLoading: prevLoading,
		error: prevError,
	} = useQuery({
		queryKey: ["pokemon", `pokemon-${id - 1}`],
		queryFn: () => fetchPokemon(id - 1),
	});

	const {
		data: nextData,
		isLoading: nextLoading,
		error: nextError,
	} = useQuery({
		queryKey: ["pokemon", `pokemon-${id + 1}`],
		queryFn: () => fetchPokemon(id + 1),
	});

	if (prevLoading || nextLoading) {
		return <p className="h-16"></p>;
	}

	return (
		<div className="flex justify-between px-4 pb-4">
			<div>
				{prevData && (
					<Link
						to={`/pokemon/${prevData.name}`}
						className="flex items-center capitalize"
					>
						<FontAwesomeIcon icon={faChevronLeft} />
						<ImageComponent
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${prevData.id}.png`}
							alt={prevData.name}
							className="h-14 mx-2"
						/>
						<small className="hidden min-[500px]:inline-block press-start-2p-small">
							#{prevData.id} {formatName(prevData.name)}
						</small>
					</Link>
				)}
			</div>
			<div>
				{nextData && (
					<Link
						to={`/pokemon/${nextData.name}`}
						className="flex items-center capitalize"
					>
						<small className="hidden min-[500px]:inline-block press-start-2p-small">
							#{nextData.id} {formatName(nextData.name)}
						</small>
						<ImageComponent
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextData.id}.png`}
							alt={nextData.name}
							className="h-14"
						/>
						<FontAwesomeIcon icon={faChevronRight} />
					</Link>
				)}
			</div>
		</div>
	);
}
