import { Link, useLocation } from "react-router-dom";

export default function Header() {
	const location = useLocation();

	return (
		<div className="flex text-center font-bold border-l-2 border-red-900 bg-red-700 rounded-t-xl overflow-hidden">
			<div className="w-1/2 -skew-x-12 border-b-8 border-r-[6px] rounded-br-lg border-red-900 flex justify-center items-center">
				<svg
					className="mx-auto content-center"
					width="330"
					height="80"
					viewBox="0 0 230 80"
					preserveAspectRatio="none"
				>
					<path id="curve" d="M 0 60 Q 110 40 220 60" fill="transparent" />
					<text width="100%" className="text-3xl font-bold">
						<textPath
							href="#curve"
							startOffset="50%"
							fill="yellow"
							stroke="blue"
							strokeWidth="1"
							textAnchor="middle"
						>
							MyPokédex
						</textPath>
					</text>
				</svg>
			</div>

			<div className="w-1/2 flex justify-evenly text-white py-2 border-t-4 border-red-900 -skew-x-12">
				<Link
					to={"/"}
					className="flex flex-col justify-center items-center skew-x-12"
				>
					<p>Search</p>
					<div
						className={`w-6 aspect-square mt-1 rounded-full border-2 border-stone-100 mx-auto bg-gradient-to-br ${
							location.pathname === "/"
								? "from-bug-light to-grass-dark"
								: "from-fighting to-dark-dark"
						}
            `}
					></div>
				</Link>

				<Link
					to={"/favorite-pokemon"}
					className="flex flex-col justify-center items-center skew-x-12"
				>
					<p>Catched</p>
					<div
						className={`w-6 aspect-square mt-1 rounded-full border-2 border-stone-100 mx-auto bg-gradient-to-br ${
							location.pathname === "/favorite-pokemon"
								? "from-bug-light to-grass-dark"
								: "from-fighting to-dark-dark"
						}
            `}
					></div>
				</Link>
			</div>
		</div>
	);
}
