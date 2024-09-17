import RegionsList from "./RegionsList";
import Searchbar from "./Searchbar";
import SearchResults from "./SearchResults";

export default function SearchSection() {
	return (
		<div className="w-1/2 border-[10px] flex flex-col border-red-800 py-4 px-8">
			<Searchbar />
			<RegionsList />
			<SearchResults />
		</div>
	);
}
