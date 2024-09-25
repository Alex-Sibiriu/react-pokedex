import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ImageComponent from "../UI/ImageComponent";
import { formatName } from "../../utils/typo";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function fetchEvoChain(url) {
	return fetch(url).then((response) => response.json());
}

function getPkmNum(speciesUrl) {
	const num = speciesUrl.split("/");
	return num[6];
}

function printTrigger(obj) {
	const printedKeys = {};

	Object.keys(obj).map((key) => {
		const keyString =
			typeof obj[key] === "object" ? JSON.stringify(obj[key]) : key;

		if (printedKeys[keyString]) {
			return null;
		}

		printedKeys[keyString] = true;
	});

	const symbols = {
		1: ">",
		"-1": "<",
		0: "=",
	};

	return Object.keys(obj).map((key, i) => (
		<li key={i}>
			{obj[key]?.name ? (
				<div className="flex flex-col justify-center items-center text-center py-1">
					<ImageComponent
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${obj[key].name}.png`}
						className="block w-8"
					/>
					<p className="flex items-center text-balance">
						{key && key !== "trigger" && key !== "item"
							? `${formatName(key)}: `
							: ""}

						{obj[key].name !== "use-item" && obj[key].name !== "level-up"
							? formatName(obj[key].name)
							: ""}
					</p>
				</div>
			) : (
				<div>
					{key === "relative_physical_stats" && obj[key] === 0 && (
						<span>Attack = Defense</span>
					)}
					{obj[key] === 0 ||
						(obj[key] && (
							<span>
								{key !== "relative_physical_stats" && formatName(key)}
								{key === "needs_overworld_rain" ||
								key === "relative_physical_stats"
									? ""
									: ":"}{" "}
								{key === "relative_physical_stats"
									? `Attack ${symbols[obj[key]] || ""} Defense`
									: ""}
								{key === "gender" || key === "relative_physical_stats"
									? ""
									: obj[key]}
								{key && key === "gender" && (
									<FontAwesomeIcon
										icon={obj[key] === 1 ? faVenus : faMars}
										className={
											obj[key] === 1 ? "text-pink-400" : "text-blue-400"
										}
									/>
								)}
							</span>
						))}
				</div>
			)}
		</li>
	));
}

export default function EvolutionChain({ url }) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["evolution-chain", url],
		queryFn: () => fetchEvoChain(url),
	});

	return (
		<section className="text-center w-[94%] mx-auto">
			<h2 className="font-bold text-xl py-4 pt-8">Evolution Chain</h2>

			<div className="py-4 md:px-8 bg-stone-100 rounded-lg shadow-inset-border">
				{isLoading ? (
					<p>Loading...</p>
				) : error ? (
					<p>Failed to fetch evolution chain.</p>
				) : data.chain.evolves_to.length < 1 ? (
					<p>This pokemon has no evolutions.</p>
				) : (
					<div
						className={`capitalize grid gap-8 ${
							data.chain.evolves_to[0]
								? data.chain.evolves_to[0].evolves_to[0]
									? "grid-cols-1 md:grid-cols-3"
									: "grid-cols-1 sm:grid-cols-2"
								: ""
						}`}
					>
						<div className="flex flex-col sm:flex-row items-center justify-evenly">
							<div className="flex flex-col w-full justify-center gap-1 items-center text-center py-4 sm:p-0 sm:pr-4">
								{data.chain.is_baby && data.baby_trigger_item?.name && (
									<ImageComponent
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${data.baby_trigger_item?.name}.png`}
										className="block w-8"
									/>
								)}

								<p className="flex items-center text-sm">
									{data.chain.is_baby
										? data.baby_trigger_item
											? formatName(data.baby_trigger_item.name)
											: "baby"
										: "base form"}
								</p>
							</div>
							<div className="shrink-0">
								<Link to={`/pokemon/${data.chain.species.name}`}>
									<ImageComponent
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPkmNum(
											data.chain.species.url
										)}.png`}
										className="bg-ball h-[125px]"
									/>
									<p>{data.chain.species.name}</p>
								</Link>
							</div>
						</div>
						{data.chain.evolves_to[0] && (
							<ul className="flex flex-col w-full gap-8 items-center justify-evenly">
								{data.chain.evolves_to.map((evo, i) => (
									<li
										key={i}
										className="w-full flex flex-col sm:flex-row sm:justify-between items-center"
									>
										<ul className="text-center flex-grow sm:pr-4 text-sm py-4 sm:p-0">
											{evo.evolution_details.map((e) => printTrigger(e))}
										</ul>
										<div className="shrink-0">
											<Link
												to={`/pokemon/${
													evo.species.name === "lycanroc"
														? "lycanroc-midday"
														: evo.species.name
												}`}
											>
												<ImageComponent
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPkmNum(
														evo.species.url
													)}.png`}
													className="bg-ball h-[125px]"
												/>
												<p>{evo.species.name}</p>
												<small>First Evolution</small>
											</Link>
										</div>
									</li>
								))}
							</ul>
						)}
						{data.chain.evolves_to[0].evolves_to[0] && (
							<ul className="flex flex-col w-full gap-8 items-center justify-evenly">
								{data.chain.evolves_to.map((ev) =>
									ev.evolves_to.map((evo) => (
										<li
											key={evo.species.name}
											className="w-full flex flex-col sm:flex-row sm:justify-between items-center"
										>
											<ul className="text-center flex-grow sm:pr-4 text-sm py-4 sm:p-0">
												{evo.evolution_details.map((e) => printTrigger(e))}
											</ul>
											<div className="shrink-0">
												<Link to={`/pokemon/${evo.species.name}`}>
													<ImageComponent
														src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPkmNum(
															evo.species.url
														)}.png`}
														className="bg-ball h-[125px]"
													/>
													<p>{evo.species.name}</p>
													<small>Second Evolution</small>
												</Link>
											</div>
										</li>
									))
								)}
							</ul>
						)}
					</div>
				)}
			</div>
		</section>
	);
}
