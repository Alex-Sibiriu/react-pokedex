import PokemonList from "../PokemonList";

export default function FavoriteList({ background }) {
	const list = JSON.parse(localStorage.getItem("FavoritesPkm")) || [];

	return (
		<div
			className="overflow-y-auto transition-all duration-500 h-full w-full mt-6 overflow-x-hidden border-4 rounded-xl border-yellow-400 pb-4 bg-stone-100 bg-cover bg-center"
			style={{
				backgroundImage: `url(${background})`,
			}}
		>
			<PokemonList key={list} list={list} fallback="no pokémon catched yet!" />
		</div>
	);
}
