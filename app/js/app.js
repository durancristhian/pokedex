(function () {

	var pokedex = angular.module("pokedex", [
		"ngRoute",
		"pokedex.controllers",
		"pokedex.directives",
		"pokedex.filters",
		"pokedex.services"
	]);

	pokedex.config(["$locationProvider", "$routeProvider", function ($locationProvider, $routeProvider) {

		$locationProvider.html5Mode(true);

		$routeProvider
		.when("/", {
			templateUrl: "/views/pokedex.html",
			controller: "pokedexController"
		})
		.when("/:type", {
			templateUrl: "/views/pokedex.html",
			controller: "pokedexController"
		})
		.when("/pokemon/:name", {
			templateUrl: "/views/pokemon.html",
			controller: "pokemonController",
			controllerAs: "pkmCtrl"
		})
		.otherwise({
			redirectTo: "/"
		});
	}]);
})();