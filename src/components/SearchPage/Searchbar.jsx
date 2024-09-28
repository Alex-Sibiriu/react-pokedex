import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../store/searchParams";
import GenerationsList from "./GenerationsList";
import TypesList from "./TypesList";

export default function Searchbar() {
	const toSearch = useSelector((state) => state.searchParams.toSearch);
	const dispatch = useDispatch();
	const searchValue = useRef("");

	function handleChange() {
		dispatch(setSearch(searchValue.current.value.trim()));
	}

	return (
		<div className="text-center py-2 w-full flex flex-col md:flex-row gap-4 md:gap-0">
			<div className="content-center text-white font-bold flex flex-col items-center justify-center">
				<label htmlFor="name" className="pb-2 block content-center">
					Name
				</label>
				<input
					id="name"
					defaultValue={toSearch}
					onChange={handleChange}
					ref={searchValue}
					type="search"
					placeholder="Search by name"
					className="px-2 py-[6px] w-[250px] rounded-md border-0 shadow-inset-border text-stone-700"
				/>
			</div>

			<div className="flex justify-evenly w-full">
				<GenerationsList />

				<TypesList typeNum={"type_1"} />

				<TypesList typeNum={"type_2"} />
			</div>
		</div>
	);
}
