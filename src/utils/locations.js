import forest from "/assets/box-background/forest.png";
import city from "/assets/box-background/city.png";
import desert from "/assets/box-background/desert.png";
import savanna from "/assets/box-background/savanna.png";
import crag from "/assets/box-background/crag.png";
import volcano from "/assets/box-background/volcano.png";
import snow from "/assets/box-background/snow.png";
import cave from "/assets/box-background/cave.png";
import beach from "/assets/box-background/beach.png";
import seafloor from "/assets/box-background/seafloor.png";
import river from "/assets/box-background/river.png";
import sky from "/assets/box-background/sky.png";
import checks from "/assets/box-background/checks.png";
import pokemon_center from "/assets/box-background/pokemon_center.png";
import machine from "/assets/box-background/machine.png";
import space from "/assets/box-background/space.png";
import backyard from "/assets/box-background/backyard.png";
import nostalgic from "/assets/box-background/nostalgic.png";

export function formatLocationName(location) {
	return location
		.split("/")
		.filter(Boolean)
		.pop()
		.split(".")
		.shift()
		.replace("_", " ");
}

export const locations = [
	forest,
	city,
	desert,
	savanna,
	crag,
	volcano,
	snow,
	cave,
	beach,
	seafloor,
	river,
	sky,
	checks,
	pokemon_center,
	machine,
	space,
	backyard,
	nostalgic,
];
