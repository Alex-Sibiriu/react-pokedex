import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { versionColors } from "../../utils/setColors";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

import "../../index.css";

import { Keyboard, Navigation } from "swiper/modules";

export default function VersionSlider({
	descriptions,
	onClick,
	selectedVersion,
}) {
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	return (
		<div className="flex w-full relative">
			<button
				disabled={isBeginning}
				className={`custom-prev transition-all w-6 h-6 flex items-center justify-center rounded-full absolute -left-7 top-1/2 transform -translate-y-1/2 border-r-2 border-b-2 cursor-pointer text-sm ${
					isBeginning
						? "opacity-0"
						: "opacity-100 bg-yellow-400  border-yellow-600"
				}`}
			>
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<Swiper
				onSlideChange={(swiper) => {
					setIsBeginning(swiper.isBeginning);
					setIsEnd(swiper.isEnd);
				}}
				onSwiper={(swiper) => {
					setIsBeginning(swiper.isBeginning);
					setIsEnd(swiper.isEnd);
				}}
				spaceBetween={2}
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
				className="mySwiper mx-auto relative"
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
				<div className="w-full bottom-0 absolute border-b-2 border-red-100"></div>
			</Swiper>

			<button
				disabled={isEnd}
				className={`custom-next transition-all w-6 h-6 flex items-center justify-center rounded-full absolute -right-7 top-1/2 transform -translate-y-1/2 border-r-2 border-b-2 cursor-pointer text-sm ${
					isEnd ? "opacity-0" : "opacity-100 bg-yellow-400  border-yellow-600"
				}`}
			>
				<FontAwesomeIcon icon={faChevronRight} />
			</button>
		</div>
	);
}
