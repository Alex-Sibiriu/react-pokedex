import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function AudioPlayer({ src }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef(null);

	function startAudio() {
		const audio = audioRef.current;
		audio.currentTime = 0;
		audio.play();

		setIsPlaying(true);
	}

	function handleAudioEnd() {
		setIsPlaying(false);
	}

	return (
		<div className={`transition-all ${isPlaying ? "text-white" : ""}`}>
			<FontAwesomeIcon icon={faVolumeHigh} onClick={startAudio} />
			<audio ref={audioRef} onEnded={handleAudioEnd}>
				<source src={src} type="audio/mpeg" />
			</audio>
		</div>
	);
}
