import { useEffect, useState } from "react";
import ImageComponent from "../UI/ImageComponent";
import TypeBadge from "../UI/TypeBadge";
import { formatName } from "../../utils/typo";
import ShinyStars from "../UI/ShinyStars";

export default function MainDetails({
	pokemon,
	genderRate,
	genera = "",
	dexNum,
}) {
	const [isShiny, setIsShiny] = useState(false);

	const favoritesPkm = JSON.parse(localStorage.getItem("FavoritesPkm")) || [];

	const [exist, setExist] = useState(
		favoritesPkm.find((pkm) => pkm.name === pokemon.name)
	);

	let pokeImage = isShiny ? "front_shiny" : "front_default";

	useEffect(() => {
		setIsShiny(false);
	}, [pokemon]);

	function toggleShiny() {
		setIsShiny(!isShiny);
	}

	const femalePercentage = genderRate === -1 ? null : (genderRate / 8) * 100;
	const malePercentage = genderRate === -1 ? null : 100 - femalePercentage;

	const pokeHeightArray = pokemon.height.toString().split("");
	const pokeHeight =
		pokeHeightArray.slice(0, -1).join("") + "," + pokeHeightArray.slice(-1);

	const pokeWeightArray = pokemon.weight.toString().split("");
	const pokeWeight =
		pokeWeightArray.slice(0, -1).join("") + "," + pokeWeightArray.slice(-1);

	const engGenus =
		genera != "" ? genera.find((g) => g.language.name === "en") : "";

	function toggleCatch(name, sprite) {
		if (exist) {
			const updatedFavorites = favoritesPkm.filter((pkm) => pkm.name !== name);

			localStorage.setItem("FavoritesPkm", JSON.stringify(updatedFavorites));
			setExist(false);
		} else {
			favoritesPkm.push({
				name,
				sprite,
			});

			setExist(true);

			localStorage.setItem("FavoritesPkm", JSON.stringify(favoritesPkm));
		}
	}

	return (
		<section className="flex flex-col md:flex-row justify-between w-[94%] mx-auto">
			<div className="md:w-5/12 relative select-none">
				{pokemon.sprites.other["official-artwork"].front_shiny && (
					<ShinyStars isShiny={isShiny} onClick={toggleShiny} />
				)}
				<ImageComponent
					src={pokemon.sprites.other["official-artwork"][pokeImage]}
					alt={pokemon.name}
					className="bg-pokeball w-full aspect-square py-4 px-3 rounded-xl bg-stone-100 shadow-inset-border"
				/>
			</div>
			<div className="md:w-1/2 pt-8 md:py-2 mb-8 flex flex-col justify-between">
				<div className="capitalize text-center pb-4">
					<h1 className="font-bold text-2xl">
						#{dexNum} {formatName(pokemon.name)}
					</h1>
					<h5>{engGenus.genus}</h5>
				</div>
				<div className="text-center md:text-start">
					<div className="flex items-center justify-center md:justify-start gap-2 pb-2 capitalize">
						<strong>Type{pokemon.types.length > 1 ? "s" : ""}: </strong>
						<ul className="flex gap-2">
							{pokemon.types.map((t) => (
								<li key={t.type.name}>
									<TypeBadge type={t.type.name} />
								</li>
							))}
						</ul>
					</div>

					<p className="pb-2">
						<strong>Height: </strong>
						{pokeHeight} m
					</p>
					<p className="pb-2">
						<strong>Weight: </strong>
						{pokeWeight} kg
					</p>
					<p className="pb-2">
						<strong>Gender Rate: </strong>{" "}
						{!femalePercentage ? "genderless" : ""}
						{(femalePercentage || malePercentage) && (
							<div className="relative mt-2">
								<progress
									value={femalePercentage}
									max={100}
									className="border-2 border-stone-100 h-6"
								/>
								<p className="capitalize text-white font-medium absolute top-0 left-1/2 -translate-x-1/2 w-full text-center">
									{!femalePercentage && "male 100%"}
									{!malePercentage && "female 100%"}
									{femalePercentage && malePercentage
										? `female ${femalePercentage}% - male ${
												100 - femalePercentage
										  }%`
										: ""}
								</p>
							</div>
						)}
					</p>

					{!pokemon.name.includes("-vmax") &&
						!pokemon.name.includes("-gmax") &&
						!pokemon.name.includes("-mega") && (
							<div className="text-center pt-4">
								<span
									onClick={() =>
										toggleCatch(pokemon.name, pokemon.sprites.front_default)
									}
									className="cursor-pointer inline-block w-32 py-1 mx-auto transition-all rounded-full font-bold bg-white hover:bg-stone-100 border-4 border-red-600 text-red-600"
								>
									{favoritesPkm.find((pkm) => pkm.name === pokemon.name)
										? "Free"
										: "Catch"}
								</span>
							</div>
						)}
				</div>
			</div>
		</section>
	);
}
