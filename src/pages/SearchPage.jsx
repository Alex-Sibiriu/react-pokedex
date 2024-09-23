import Searchbar from "../components/SearchPage/Searchbar";
import SearchResults from "../components/SearchPage/SearchResults";

export default function SearchPage() {
	return (
		<div className="w-full flex flex-col border-red-800">
			<Searchbar />
			<SearchResults />
		</div>
	);
}
