import Searchbar from "../components/Searchbar";
import GenerationsList from "../components/SearchPage/GenerationsList";
import SearchResults from "../components/SearchPage/SearchResults";

export default function SearchPage() {
	return (
		<div className="w-full flex flex-col border-red-800">
			<Searchbar />
			<GenerationsList />
			<SearchResults />
		</div>
	);
}
