import { typeBackgrounds } from "../../utils/setColors";

export default function TypeBadge({ type }) {
	const bg = typeBackgrounds[type] || "from-gray-300 to-gray-500";

	return (
		<span
			className={`bg-gradient-to-b ${bg} shadow-sm shadow-black px-2 py-1 rounded-md text-white font-medium`}
		>
			{type}
		</span>
	);
}
