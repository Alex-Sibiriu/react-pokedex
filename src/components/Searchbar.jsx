import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
	const navigate = useNavigate();
	const toSearch = useRef("");

	function handleSubmit(event) {
		event.preventDefault();

		if (toSearch.current.value === "") {
			navigate("/");
		} else {
			navigate(`/pokemon/${toSearch.current.value}`);
		}
	}

	return (
		<form className="text-center" onSubmit={handleSubmit}>
			<input
				ref={toSearch}
				type="search"
				placeholder="Search by name or number"
				className="p-2 w-[250px] rounded-md me-2 border-4 border-stone-600"
			/>
			<button className="bg-yellow-400 px-4 py-2 rounded-md">Search</button>
		</form>
	);
}
