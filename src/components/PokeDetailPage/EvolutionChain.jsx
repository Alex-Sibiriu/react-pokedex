import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ImageComponent from "../UI/ImageComponent";
import { formatName } from "../../utils/typo";

function fetchEvoChain(url) {
	return fetch(url).then((response) => response.json());
}

function getPkmNum(speciesUrl) {
	const num = speciesUrl.split("/");
	return num[6];
}

function printTrigger(obj) {
	return Object.keys(obj).map((key) => (
		<li key={key}>
			{obj[key]?.name ? (
				<div className="flex flex-col justify-center items-center text-center">
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
					{obj[key] && key !== "trigger" && key !== "item" && (
						<span>
							{formatName(key)}
							{key === "needs_overworld_rain" ? "" : ":"} {obj[key]}
						</span>
					)}
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
		<section className="text-center">
			<h2 className="font-bold text-xl py-4 pt-8">Evolution Chain</h2>

			<div className="py-4 px-8 bg-stone-100 mx-auto rounded-lg shadow-inset-border">
				{isLoading ? (
					<p>Loading...</p>
				) : error ? (
					<p>Failed to fetch evolution chain.</p>
				) : data.chain.evolves_to.length < 1 ? (
					<p>This pokemon has no evolutions.</p>
				) : (
					<div
						className={`capitalize grid ${
							data.chain.evolves_to[0]
								? data.chain.evolves_to[0].evolves_to[0]
									? "grid-cols-3"
									: "grid-cols-2"
								: ""
						}`}
					>
						<div className="flex items-center justify-evenly">
							<div className="flex flex-col justify-center items-center text-center">
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
							<div>
								<Link to={`/pokemon/${data.chain.species.name}`}>
									<ImageComponent
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPkmNum(
											data.chain.species.url
										)}.png`}
										className="bg-ball"
									/>
									<p>{data.chain.species.name}</p>
								</Link>
							</div>
						</div>
						{data.chain.evolves_to[0] && (
							<ul className="flex flex-col w-full gap-8 items-center justify-evenly">
								{data.chain.evolves_to.map((evo) => (
									<li
										key={evo}
										className="h-[125px] w-full flex justify-between items-center"
									>
										<ul className="text-center flex-grow pr-4 text-sm">
											{evo.evolution_details.map((e) => printTrigger(e))}
										</ul>
										<div>
											<Link to={`/pokemon/${evo.species.name}`}>
												<ImageComponent
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPkmNum(
														evo.species.url
													)}.png`}
													className="bg-ball"
												/>
												<p>{evo.species.name}</p>
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
											className="h-[125px] w-full flex justify-between items-center"
										>
											<ul className="text-center flex-grow pr-4 text-sm">
												{evo.evolution_details.map((e) => printTrigger(e))}
											</ul>
											<div>
												<Link to={`/pokemon/${evo.species.name}`}>
													<ImageComponent
														src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPkmNum(
															evo.species.url
														)}.png`}
														className="bg-ball"
													/>
													<p>{evo.species.name}</p>
												</Link>
											</div>
										</li>
									))
								)}
							</ul>

							// <>
							// 	<li className="flex items-center">
							// 		{formatName(
							// 			data.chain.evolves_to[0].evolves_to[0].evolution_details[0]
							// 				.trigger.name
							// 		)}

							// 		{
							// 			data.chain.evolves_to[0].evolves_to[0].evolution_details[0]
							// 				.min_level
							// 		}
							// 	</li>
							// 	<li>
							// 		<Link
							// 			to={`/pokemon/${data.chain.evolves_to[0].evolves_to[0].species.name}`}
							// 		>
							// 			<ImageComponent
							// 				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPkmNum(
							// 					data.chain.evolves_to[0].evolves_to[0].species.url
							// 				)}.png`}
							// 				className="bg-ball"
							// 			/>
							// 			<p>{data.chain.evolves_to[0].evolves_to[0].species.name}</p>
							// 		</Link>
							// 	</li>
							// </>
						)}
					</div>
				)}
			</div>
		</section>
	);
}
