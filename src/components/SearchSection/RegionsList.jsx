import { useQuery } from "@tanstack/react-query";

function fetchRegions() {
	return fetch("https://pokeapi.co/api/v2/region/").then((response) =>
		response.json()
	);
}

export default function RegionsList() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["regions", 1],
		queryFn: fetchRegions,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<ul className="flex gap-1 text-white mt-6 pl-4">
			<li className="cursor-pointer rounded-t-lg px-2 py-1 font-bold border-4 border-b-0 border-yellow-500 transition-all bg-yellow-400 hover:bg-yellow-500 capitalize">
				All
			</li>
			{data.results.map((region) => (
				<li
					key={region.name}
					className="cursor-pointer rounded-t-lg px-2 py-1 font-bold border-4 border-b-0 border-yellow-500 transition-all bg-amber-500 hover:bg-yellow-500 capitalize"
				>
					{region.name}
				</li>
			))}
		</ul>
	);
}
