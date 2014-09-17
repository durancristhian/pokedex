(function () {

	var pokedex = angular.module("pokedex", []);

	pokedex.controller("pokemonController", function () {

		this.pokemon = {
			id: 1,
			name: "Bulbasaur",
			species: "Seed Pokemon",
			types: ["Grass", "Poison"],
			height: "0.71 m",
			weight: "6.9 kg",
			abilities: ["Overgrow", "Chlorophyll"]
		};
	});
})();