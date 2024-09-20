export function formatName(name) {
	return name.includes("-") ? name.replace(/-/g, " ") : name;
}
