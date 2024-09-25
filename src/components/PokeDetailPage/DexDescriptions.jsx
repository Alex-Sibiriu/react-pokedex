import { useState } from "react";
import VersionSlider from "./VersionsSlider";

import { versionColors } from "../../utils/setColors";

export default function DexDescriptions({ descriptions }) {
	const [version, setVersion] = useState(null);

	const engDescriptions = descriptions.filter(
		(text) => text.language.name === "en"
	);

	const flavorText = engDescriptions.find(
		(text) => text.version.name === version
	);

	const formattedText = flavorText?.flavor_text
		.replace(/\n/g, " ")
		.replace(/\f/g, " ");

	return (
		<section className="text-center w-[94%] mx-auto">
			<h2 className="font-bold text-xl py-4 pt-8">Dex Descriptions</h2>

			<ul className="flex justify-evenly mx-auto rounded-lg">
				<VersionSlider
					descriptions={engDescriptions}
					onClick={setVersion}
					selectedVersion={version}
				/>
			</ul>
			<div
				className={`${
					versionColors[version] || "bg-stone-100 shadow-inset-border"
				} border-2 border-t-0 border-stone-100 rounded-b-md p-8 transition-all`}
			>
				<p>{formattedText || "Select a game version."}</p>
			</div>
		</section>
	);
}
