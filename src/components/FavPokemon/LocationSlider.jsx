import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { locations } from "../../utils/locations";
import { formatLocationName } from "../../utils/locations";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import "../../index.css";

import { EffectFade, Keyboard, Navigation } from "swiper/modules";

export default function LocationSlider({ onClick, background }) {
	return (
		<div className="flex items-center gap-2 w-full">
			<button className="custom-prev transition-all w-6 h-6 flex items-center justify-center rounded-full border-r-2 border-b-2 cursor-pointer text-sm z-10 shrink-0 bg-yellow-400 border-yellow-600">
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<Swiper
				keyboard={{
					enabled: true,
				}}
				navigation={{
					prevEl: ".custom-prev",
					nextEl: ".custom-next",
				}}
				loop={true}
				effect="fade"
				fadeEffect={{ crossFade: true }}
				initialSlide={locations.findIndex((l) => l === background)}
				modules={[Keyboard, Navigation, EffectFade]}
				className="mySwiper mx-auto border-4 border-yellow-500 rounded-lg "
			>
				{locations.map((location) => (
					<SwiperSlide key={location}>
						<p
							onClick={() => onClick(location)}
							className="text-center text-md cursor-pointer font-bold w-full transition-all capitalize bg-cover bg-center py-2 text-stone-800"
							style={{
								backgroundImage: `url(${location})`,
							}}
						>
							{formatLocationName(location)}
						</p>
					</SwiperSlide>
				))}
			</Swiper>

			<button className="custom-next transition-all w-6 h-6 flex items-center justify-center rounded-full border-r-2 border-b-2 cursor-pointer text-sm z-10 shrink-0 bg-yellow-400 border-yellow-600">
				<FontAwesomeIcon icon={faChevronRight} />
			</button>
		</div>
	);
}
