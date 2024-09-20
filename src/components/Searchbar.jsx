import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../store/searchParams";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toSearch = useRef("");

	function handleChange() {
		dispatch(setSearch(toSearch.current.value.trim()));

		navigate("/");
	}

	return (
		<div className="text-center">
			<input
				onChange={handleChange}
				ref={toSearch}
				type="search"
				placeholder="Search by name or number"
				className="p-2 w-[250px] rounded-md me-2 border-4 border-stone-600"
			/>
			<button className="bg-yellow-400 px-4 py-2 rounded-md">Search</button>
		</div>
	);
}
