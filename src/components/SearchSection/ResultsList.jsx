import ImageComponent from "../UI/ImageComponent";

export default function ResultsList({ count }) {
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
		<div className="overflow-auto border-4 rounded-xl border-yellow-400">
			<ul className="flex flex-wrap bg-blue-700">
				{ImagesUrl.map((image) => (
					<li
						key={image.dexNum}
						className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 circle-light"
					>
						<ImageComponent src={image.url} loading="lazy" alt={image.dexNum} />
					</li>
				))}
			</ul>
		</div>
	);
}
