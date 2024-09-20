import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

import "../../index.css";

import { Keyboard, Navigation } from "swiper/modules";

import { versionColors } from "../../utils/setColors";

export default function VersionSlider({
	descriptions,
	onClick,
	selectedVersion,
}) {
	return (
		<div className="flex w-full relative">
			<button className="custom-prev w-6 h-6 flex items-center justify-center bg-stone-100 absolute -left-7 top-1/2 transform -translate-y-1/2 rounded-full">
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<Swiper
				spaceBetween={0}
				keyboard={{
					enabled: true,
				}}
				breakpoints={{
					450: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					600: {
						slidesPerView: 3,
						slidesPerGroup: 3,
					},
					850: {
						slidesPerView: 4,
						slidesPerGroup: 4,
					},
					1000: {
						slidesPerView: 5,
						slidesPerGroup: 5,
					},
				}}
				navigation={{
					prevEl: ".custom-prev",
					nextEl: ".custom-next",
				}}
				modules={[Keyboard, Navigation]}
				className="mySwiper mx-auto"
			>
				{descriptions.map((text) => (
					<SwiperSlide key={text.version.name}>
						<p
							onClick={() => onClick(text.version.name)}
							className={`text-center cursor-pointer font-bold w-full transition-all border-2 border-stone-100 rounded-t-lg capitalize ${
								versionColors[text.version.name]
							} ${
								selectedVersion === text.version.name
									? "border-b-transparent"
									: ""
							}`}
						>
							{text.version.name.split("-").join(" ")}
						</p>
					</SwiperSlide>
				))}
			</Swiper>

			<button className="custom-next w-6 h-6 flex items-center justify-center rounded-full absolute -right-7 bg-stone-100 top-1/2 transform -translate-y-1/2">
				<FontAwesomeIcon icon={faChevronRight} />
			</button>
		</div>
	);
}
