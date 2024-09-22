import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/searchParams";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
	const toSearch = useSelector((state) => state.searchParams.toSearch);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchValue = useRef("");

	function handleChange() {
		dispatch(setSearch(searchValue.current.value.trim()));

		navigate("/");
	}

	return (
		<div className="text-center">
			<input
				defaultValue={toSearch}
				onChange={handleChange}
				ref={searchValue}
				type="search"
				placeholder="Search by name or number"
				className="p-2 w-[250px] rounded-md me-2 border-4 border-stone-600"
			/>
			<button className="bg-yellow-400 px-4 py-2 rounded-md">Search</button>
		</div>
	);
}
