import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root";
import SearchPage from "./pages/SearchPage";
import PokeDetailsPage from "./pages/PokeDetailsPage";
import FavPokemonPage from "./pages/FavPokemonPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <SearchPage /> },
			{ path: "pokemon/:pokeName", element: <PokeDetailsPage /> },
			{ path: "favorite-pokemon", element: <FavPokemonPage /> },
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
