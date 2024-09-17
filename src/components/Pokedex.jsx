import CatchedPokemons from "./CatchedPokemons";
import SearchSection from "./SearchSection/SearchSection";

export default function Pokedex() {
	return (
		<div className="w-10/12 h-5/6 bg-red-700 mx-auto flex shadow-2xl shadow-gray-700">
			<SearchSection />
			<div className="w-1/2 border-[10px] border-red-800 py-4">
				<CatchedPokemons />
			</div>
		</div>
	);
}
