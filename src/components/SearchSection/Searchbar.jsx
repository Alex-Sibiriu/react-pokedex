import { useDispatch } from "react-redux";
import { setSearch } from "../../store/searchParams";
import { useRef } from "react";

export default function Searchbar() {
	const dispatch = useDispatch();
	const toSearch = useRef("");

	function handleChange() {
		dispatch(setSearch(toSearch.current.value));
	}

	return (
		<div className="text-center">
			<input
				ref={toSearch}
				type="search"
				placeholder="Filter by name or number"
				className="p-2 w-[250px] rounded-md me-2 border-4 border-stone-600"
			/>
			<button
				onClick={handleChange}
				className="bg-yellow-400 px-4 py-2 rounded-md"
			>
				Search
			</button>
		</div>
	);
}
