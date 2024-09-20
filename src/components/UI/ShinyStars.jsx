import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShinyStars({ isShiny, onClick }) {
	return (
		<div
			onClick={onClick}
			className={`absolute top-2 right-3 w-7 cursor-pointer text-xs h-11 ${
				!isShiny ? "text-gray-400" : "text-yellow-400"
			}`}
		>
			<FontAwesomeIcon
				icon={faStar}
				className="absolute top-0 left-0 rotate-45 translate-y-1/2"
			/>
			<FontAwesomeIcon
				icon={faStar}
				className="absolute top-1/2 right-0 -translate-y-1/2 rotate-90"
			/>
			<FontAwesomeIcon
				icon={faStar}
				className="absolute bottom-0 left-0 -translate-y-1/2 rotate-90"
			/>
		</div>
	);
}
