export function formatName(name) {
	name = name.includes("-") ? name.replace(/-/g, " ") : name;

	name = name.includes("_") ? name.replace(/_/g, " ") : name;

	return name;
}
