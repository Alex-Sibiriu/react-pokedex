import { Outlet } from "react-router-dom";

export default function RootLayout() {
	return (
		<div className=" h-screen content-center bg-blue-500">
			<div className="w-10/12 max-w-[900px] h-5/6 rounded-xl bg-red-700 mx-auto flex shadow-2xl shadow-gray-700 py-4 px-8">
				<Outlet />
			</div>
		</div>
	);
}
