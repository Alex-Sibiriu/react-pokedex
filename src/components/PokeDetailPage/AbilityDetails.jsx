export default function AbilityDetails({ pokemon }) {
	function checkAbility(ability) {
		if (ability.is_hidden) {
			return "hidden ability";
		} else if (ability.slot === 1) {
			return "first ability";
		} else if (ability.slot === 2) {
			return "second ability";
		} else if (ability.slot === 3) {
			return "third ability";
		}
	}

	return (
		<section className="text-center">
			<h2 className="font-bold text-xl py-4">Abilities</h2>

			<ul className="flex flex-col sm:flex-row gap-4 justify-evenly py-4 bg-stone-100 mx-auto rounded-lg shadow-inset-border">
				{pokemon.abilities.map((a) => (
					<li key={a.ability.name} className="capitalize">
						<strong>
							{a.ability.name.includes("-")
								? a.ability.name.replace("-", " ")
								: a.ability.name}
						</strong>
						<span className="capitalize block">{checkAbility(a)}</span>
					</li>
				))}
			</ul>
		</section>
	);
}
