import Searchbar from "../components/Searchbar";
import RegionsList from "../components/SearchPage/RegionsList";
import SearchResults from "../components/SearchPage/SearchResults";

export default function SearchPage() {
	return (
		<div className="w-full flex flex-col border-red-800">
			<Searchbar />
			<RegionsList />
			<SearchResults />
		</div>
	);
}
