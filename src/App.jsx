import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root";
import SearchPage from "./pages/SearchPage";
import PokeDetailsPage from "./pages/PokeDetailsPage";
import FavPokemon from "./pages/FavPokemon";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <SearchPage /> },
			{ path: "pokemon/:pokeName", element: <PokeDetailsPage /> },
			{ path: "favorite-pokemon", element: <FavPokemon /> },
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
