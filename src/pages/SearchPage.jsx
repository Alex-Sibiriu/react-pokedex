import Searchbar from "../components/SearchPage/Searchbar";
import SearchResults from "../components/SearchPage/SearchResults";

export default function SearchPage() {
	return (
		<div className="w-full h-full flex flex-wrap">
			<Searchbar />
			<SearchResults />
		</div>
	);
}
