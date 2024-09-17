import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pokedex from "./components/Pokedex";

const queryClient = new QueryClient();

export default function App() {
	return (
		<div className="h-screen content-center bg-blue-500">
			<QueryClientProvider client={queryClient}>
				<Pokedex />
			</QueryClientProvider>
		</div>
	);
}
