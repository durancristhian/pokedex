(function () {

	angular.module("pokedex.controllers", [])

		.controller("pokedexController", ["$scope", "$routeParams", "pokemonService", function ($scope, $routeParams, pokemonService) {

			var type = $routeParams.type;

			if(type) {

				pokemonService.byType(type).then(function (data) {

					$scope.pokemons = data;
				});
			} else {

				pokemonService.all().then(function (data) {

					$scope.pokemons = data;
				});
			}
		}])

		.controller("pokemonController", ["$scope", "$routeParams", "pokemonService", function ($scope, $routeParams, pokemonService) {

			var name = $routeParams.name;

			pokemonService.byName(name).then(function (data) {

				$scope.pokemon = data;
			});
		}]);
})();