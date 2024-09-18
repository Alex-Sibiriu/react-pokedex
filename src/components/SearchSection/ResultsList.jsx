import ImageComponent from "../UI/ImageComponent";
import { setSearch } from "../../store/searchParams";
import { useDispatch } from "react-redux";

export default function ResultsList({ count }) {
	const dispatch = useDispatch();

	function handleClick(dexNum) {
		dispatch(setSearch(dexNum));
	}

	const ImagesUrl = [];

	for (let i = 0; i < count; i++) {
		const image = {
			url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
				i + 1
			}.png`,
			dexNum: i + 1,
		};
		ImagesUrl.push(image);
	}

	return (
		<ul className="flex flex-wrap">
			{ImagesUrl.map((image) => (
				<li
					key={image.dexNum}
					className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 circle-light"
				>
					<ImageComponent
						src={image.url}
						alt={image.dexNum}
						onClick={() => handleClick(image.dexNum)}
						className="p-4"
					/>
				</li>
			))}
		</ul>
	);
}
