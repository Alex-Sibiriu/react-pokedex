import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setGeneration } from "../../store/searchParams";

import { generationsColors } from "../../utils/setColors";
import { useEffect, useRef, useState } from "react";

const generations = {
	"generation-i": { name: "generation-i", first: 1, last: 151 },
	"generation-ii": { name: "generation-ii", first: 152, last: 251 },
	"generation-iii": { name: "generation-iii", first: 252, last: 386 },
	"generation-iv": { name: "generation-iv", first: 387, last: 493 },
	"generation-v": { name: "generation-v", first: 494, last: 649 },
	"generation-vi": { name: "generation-vi", first: 650, last: 721 },
	"generation-vii": { name: "generation-vii", first: 722, last: 809 },
	"generation-viii": { name: "generation-viii", first: 810, last: 905 },
	"generation-ix": { name: "generation-ix", first: 906, last: 1025 },
};

function fetchGenerations() {
	return fetch("https://pokeapi.co/api/v2/generation").then((response) =>
		response.json()
	);
}

export default function GenerationsList() {
	const dispatch = useDispatch();
	const selectedGeneration = useSelector(
		(state) => state.searchParams.selectedGeneration
	);
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef(null);

	function handleClick(gen) {
		dispatch(setGeneration(gen));
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
		queryKey: ["generations", 1],
		queryFn: fetchGenerations,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="font-bold flex items-center text-white">
			<label htmlFor="gen-select" className="mr-2">
				Gen:
			</label>
			<div ref={selectRef} className="relative w-16">
				<button
					id="gen-select"
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					onClick={() => setIsOpen(!isOpen)}
					className={`text-center transition-all rounded-md uppercase border-2 border-stone-100 p-1 w-full bg-gradient-to-b ${
						generationsColors[selectedGeneration?.name] ??
						generationsColors["all"]
					}`}
				>
					{selectedGeneration ? selectedGeneration.name.split("-")[1] : "All"}
				</button>
				<ul
					role="listbox"
					className={`absolute transition-all duration-500 top-full left-0 w-full bg-white border-stone-100 rounded-md z-10 overflow-hidden ${
						isOpen ? "max-h-96 border-2" : "max-h-0 border-0"
					}`}
				>
					<li
						role="option"
						aria-selected={selectedGeneration === "all"}
						className={`cursor-pointer border-2 border-stone-100 p-1 font-bold transition-all uppercase ${generationsColors["all"]}`}
						onClick={() => {
							handleClick(null);
							setIsOpen(false);
						}}
					>
						All
					</li>
					{data.results.map((generation) => (
						<li
							key={generation.name}
							role="option"
							aria-selected={selectedGeneration === generation.name}
							onClick={() => {
								handleClick(generations[generation.name]);
								setIsOpen(false);
							}}
							className={`cursor-pointer border-2 border-stone-100 p-1 font-bold transition-all uppercase ${
								generationsColors[generation.name]
							}`}
						>
							{generation.name.split("-")[1]}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
