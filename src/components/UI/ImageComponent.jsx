import { useState } from "react";

export default function ImageComponent({ src, alt, ...props }) {
	const [isLoaded, setIsLoaded] = useState(true);

	// Gestione errore di caricamento
	const handleError = () => {
		setIsLoaded(false);
	};

	// Se l'immagine non si carica, non renderizzare nulla
	if (!isLoaded) {
		return null;
	}

	return (
		<img src={src} alt={alt} {...props} onError={handleError} loading="lazy" />
	);
}
