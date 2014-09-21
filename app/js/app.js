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
			abilities: ["Overgrow", "Chlorophyll"],
			stats: {
				hp: 45,
				attack: 49,
				defense: 49,
				"sp.atk": 65,
				"sp.def": 65,
				speed: 45,
				total: 318
			},
			evolution: ["Bulbasaur", "Ivysaur", "Venusaur"]
		};
	});

	pokedex.directive("pokemonHeader", function () {

		return {
			restrict: "A",
			templateUrl: "/partials/pokemon-header.html"
		};
	});

	pokedex.filter("imageFilter", function () {

		return function (input) {

			return "/img/" + input.toLowerCase() + ".png";
		};
	});

	pokedex.controller("tabsController", function () {

		this.tab = 0;

		this.selectTab = function (tab) {

			if(tab === this.tab) {

				this.tab = 0;
			} else {

				this.tab = tab;
			}
		};
	});

	pokedex.directive("pokemonData", function () {

		return {
			restrict: "A",
			templateUrl: "/partials/pokemon-data.html"
		};
	});

	pokedex.directive("pokemonStats", function () {

		return {
			restrict: "A",
			templateUrl: "/partials/pokemon-stats.html"
		};
	});

	pokedex.directive("pokemonEvolution", function () {

		return {
			restrict: "A",
			templateUrl: "/partials/pokemon-evolution.html"
		};
	});

	pokedex.directive("pokemonComments", function () {

		return {
			restrict: 'A',
			templateUrl: "/partials/pokemon-comments.html",
			controller: function () {

				this.comments = [];
				this.comment = {};

				this.anonymousChanged = function () {

					if(this.comment.anonymous) {

						this.comment.email = "";
					}
				};

				this.addComment = function () {

					this.comment.date = Date.now();

					this.comments.push(this.comment);

					this.comment = {};
				};
			},
			controllerAs: "cmtsCtrl"
		};
	});
})();