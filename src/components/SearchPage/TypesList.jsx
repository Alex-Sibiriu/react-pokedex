import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setType1, setType2 } from "../../store/searchParams";
import { setBgColors } from "../../utils/setColors";
import { useEffect, useRef, useState } from "react";

function fetchTypes() {
	return fetch("https://pokeapi.co/api/v2/type").then((response) =>
		response.json()
	);
}

export default function TypesList({ typeNum }) {
	const dispatch = useDispatch();
	const selectedType = useSelector(
		(state) => state.searchParams.selectedTypes[typeNum]
	);
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef(null);

	function handleClick(type) {
		if (typeNum === "type_1") {
			dispatch(setType1(type));
		} else if (typeNum === "type_2") {
			dispatch(setType2(type));
		}
	}

	// Handle clicking outside the dropdown
	useEffect(() => {
		function handleClickOutside(event) {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const { data, isLoading, error } = useQuery({
		queryKey: ["types", 1],
		queryFn: fetchTypes,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="font-bold flex flex-col items-center text-white ">
			<label htmlFor="type-select" className="text-white pb-2 block capitalize">
				{typeNum.replace("_", " ")}
			</label>
			<div className="relative w-28" ref={selectRef}>
				{/* Dropdown button */}
				<button
					id="type-select"
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					onClick={() => setIsOpen(!isOpen)}
					className={`text-center transition-all rounded-md uppercase border-2 border-stone-100 p-1 w-full bg-gradient-to-b ${setBgColors(
						selectedType
					)}`}
				>
					{selectedType ? selectedType : "All"}
				</button>

				{/* Dropdown menu */}
				<ul
					role="listbox"
					className={`absolute transition-all duration-500 top-full left-0 w-full bg-white border-stone-100 rounded-md z-10 overflow-y-auto ${
						isOpen ? "max-h-96 border-2" : "max-h-0 border-0"
					}`}
				>
					{/* All option */}
					<li
						role="option"
						aria-selected={selectedType === null}
						className={`cursor-pointer border-b-2 border-stone-100 p-2 uppercase bg-gradient-to-b ${setBgColors(
							"all"
						)}`}
						onClick={() => {
							handleClick(null);
							setIsOpen(false);
						}}
					>
						All
					</li>

					{/* Map through types */}
					{data.results
						.filter((t) => t.name !== "stellar" && t.name !== "unknown")
						.map((type) => (
							<li
								key={type.name}
								role="option"
								aria-selected={selectedType === type.name}
								className={`cursor-pointer border-b-2 border-stone-100 font-bold transition-all uppercase bg-gradient-to-b ${setBgColors(
									type.name
								)} p-2`}
								onClick={() => {
									handleClick(type.name);
									setIsOpen(false);
								}}
							>
								{type.name}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
