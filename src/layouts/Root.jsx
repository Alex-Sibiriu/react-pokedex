import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function RootLayout() {
	return (
		<div className="h-screen relative flex items-center justify-center overflow-hidden">
			<video
				autoPlay
				loop
				muted
				className="absolute top-0 left-0 w-full h-full object-cover z-[-1] hidden md:block"
			>
				<source src="/assets/Dex-gif.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="h-full md:h-[90%] w-full max-w-[800px] z-10 flex flex-col text-stone-800 rounded-xl bg-red-700 border-8 border-t-4 border-red-900 mx-auto shadow-2xl shadow-gray-700 overflow-hidden">
				<header className="flex-shrink-0 bg-red-900">
					<Header />
				</header>

				<main className="w-full flex-grow text-stone-800 rounded-b-xl bg-red-700 mx-auto px-4 md:px-8 py-4 flex flex-col overflow-hidden">
					<div className="flex h-full w-full overflow-hidden border-b-4 rounded-b-lg border-yellow-400">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}
