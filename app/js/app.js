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

	pokedex.controller("tabsController", function () {

		this.tab = 1;

		this.selectTab = function (tab) {

			this.tab = tab;
		}
	});

	pokedex.filter("imageFilter", function () {

		return function (input) {

			return "/img/" + input.toLowerCase() + ".png";
		};
	});

	pokedex.directive("pokemonData", function () {

		return {
			restrict: 'E',
			templateUrl: "/partials/pokemon-data.html"
		};
	});

	pokedex.directive("pokemonComments", function () {

		return {
			restrict: 'E',
			templateUrl: "/partials/pokemon-comments.html",
			controller: function () {

				this.showPanel = false;
				this.comments = [];
				this.comment = {};

				this.toggle = function () {

					this.showPanel = !this.showPanel;
				};

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