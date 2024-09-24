import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function RootLayout() {
	return (
		<div className="h-screen bg-blue-500 flex items-center justify-center">
			<div className="pokedex w-11/12 max-w-[900px] flex flex-col text-stone-800 rounded-xl bg-red-700 border-8 border-t-4 border-red-900 mx-auto shadow-2xl shadow-gray-700 overflow-hidden">
				<header className="flex-shrink-0 bg-red-900">
					<Header />
				</header>

				<main className="w-full flex-grow text-stone-800 rounded-b-xl bg-red-700 mx-auto px-8 py-4 flex flex-col overflow-hidden">
					<div className="flex h-full w-full overflow-hidden border-b-4 rounded-b-lg border-yellow-400">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}
