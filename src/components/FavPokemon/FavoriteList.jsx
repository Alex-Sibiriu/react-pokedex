import PokemonList from "../PokemonList";

export default function FavoriteList() {
	const list = JSON.parse(localStorage.getItem("FavoritesPkm"));

	console.log(list);

	return (
		<div className="overflow-y-auto h-full w-full mt-6 overflow-x-hidden border-4 bg-gradient-to-b from-blue-50 to-[#0DE0F5] rounded-xl border-yellow-400 pb-4">
			<PokemonList list={list} fallback="no pokémon catched yet!" />
		</div>
	);
}
