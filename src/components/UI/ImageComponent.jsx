import { useState } from "react";

export default function ImageComponent({ src, alt }) {
	const [isLoaded, setIsLoaded] = useState(true);

	// Gestione errore di caricamento
	const handleError = () => {
		setIsLoaded(false);
	};

	// Se l'immagine non si carica, non rendere nulla
	if (!isLoaded) {
		return null;
	}

	return (
		<img
			src={src}
			alt={alt}
			onError={handleError}
			loading="lazy"
			className="p-4"
		/>
	);
}
