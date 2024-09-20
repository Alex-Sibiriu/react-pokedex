import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root";
import SearchPage from "./pages/SearchPage";
import PokeDetailsPage from "./pages/PokeDetailsPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <SearchPage /> },
			{ path: "pokemon/:pokeName", element: <PokeDetailsPage /> },
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
