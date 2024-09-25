import { setStatColor } from "../../utils/setColors";

const statColors = {
	hp: {
		light: "#DFF4D9",
		gradient: "from-[#78C850] to-[#5A9E40]",
	},
	attack: {
		light: "#F4D3D1",
		gradient: "from-[#C03028] to-[#9C2620]",
	},
	defense: {
		light: "#D1E4F9",
		gradient: "from-[#6890F0] to-[#5178C0]",
	},
	"special-attack": {
		light: "#F9D1DE",
		gradient: "from-[#F85888] to-[#D04067]",
	},
	"special-defense": {
		light: "#FAF0D4",
		gradient: "from-[#F8D030] to-[#C8A020]",
	},
	speed: {
		light: "#F9E1D4",
		gradient: "from-[#F08030] to-[#C06020]",
	},
};

export default function StatsTab({ stats }) {
	function renameStats(stat) {
		if (stat === "special-attack") {
			return "sp. atk.";
		} else if (stat === "special-defense") {
			return "sp. def.";
		}
		return stat;
	}

	function statBar(statValue) {
		return `${((statValue / 255) * 100).toFixed(2)}%`;
	}

	return (
		<section className="text-center w-[94%] mx-auto">
			<h2 className="font-bold text-xl pb-4 pt-8">Base Stats</h2>
			<ul className="rounded-md overflow-hidden border-2 border-stone-100 bg-stone-100">
				{stats.map((st, i) => (
					<li
						className="capitalize flex font-bold overflow-hidden rounded-md"
						key={st.stat.name}
					>
						<span
							className="w-full sm:w-32 flex px-2 py-1 border-2 border-stone-100 rounded-md overflow-hidden"
							style={{
								backgroundColor: statColors[st.stat.name]?.light || "#F5F5F5",
							}}
						>
							{renameStats(st.stat.name)}
							<span className="w-8 inline-block ms-auto">{st.base_stat}</span>
						</span>
						<span
							className="flex-grow relative border-2 overflow-hidden border-stone-100 rounded-md hidden sm:inline-block"
							style={{
								backgroundColor: statColors[st.stat.name]?.light || "#F5F5F5",
							}}
						>
							<span
								className={`stat-bar absolute left-0 h-full rounded-e-full bg-gradient-to-b ${
									statColors[st.stat.name]?.gradient
								}`}
								style={{
									width: statBar(st.base_stat),
								}}
							></span>
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
