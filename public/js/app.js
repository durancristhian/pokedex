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
(function () {

	angular.module("pokedex.directives", [])

		.directive("pokemonHeader", function () {

			return {
				restrict: "A",
				templateUrl: "/partials/pokemon-header.html"
			};
		})

		.directive("pokemonTabs", function () {

			return {
				restrict: "A",
				templateUrl: "/partials/pokemon-tabs.html",
				controller: ["$scope", function ($scope) {

					$scope.tab = 0;

					$scope.selectTab = function (tab) {

						if(tab === $scope.tab) {

							$scope.tab = 0;
						} else {

							$scope.tab = tab;
						}
					};
				}]
			};
		})

		.directive("pokemonData", function () {

			return {
				restrict: "A",
				templateUrl: "/partials/pokemon-data.html"
			};
		})

		.directive("pokemonStats", function () {

			return {
				restrict: "A",
				templateUrl: "/partials/pokemon-stats.html"
			};
		})

		.directive("pokemonEvolution", function () {

			return {
				restrict: "A",
				templateUrl: "/partials/pokemon-evolution.html"
			};
		})

		.directive('backButton', ["$window", function ($window) {
			return {
				restrict: 'A',
				link: function ($scope, element, attrs) {

					element.bind('click', goBack);

					function goBack() {

						$window.history.back();
					}
				}
			}
		}])

		.directive("pokemonComments", function () {

			return {
				restrict: 'A',
				templateUrl: "/partials/pokemon-comments.html",
				controller: ["$scope", function ($scope) {

					$scope.comments = [];
					$scope.comment = {};

					$scope.anonymousChanged = function () {

						if($scope.comment.anonymous) {

							$scope.comment.email = "";
						}
					};

					$scope.addComment = function () {

						$scope.comment.date = Date.now();

						$scope.comments.push($scope.comment);

						$scope.comment = {};
					};
				}]
			};
		});
})();
(function () {

	angular.module("pokedex.filters", [])

		.filter("normalize", function () {

			return function (input) {

				if(input !== undefined) {

					return input
						.replace("♀", "f")
						.replace("♂", "m")
						.replace(/\W+/g, "")
						.toLowerCase();
				}

				return "";
			};
		})

		.filter("imageFilter", ["$filter", function ($filter) {

			return function (input) {

				return "/images/pokemons/" + $filter("normalize")(input) + ".jpg";
			};
		}]);
})();
(function () {

	angular.module("pokedex.services", [])

	.factory("pokemonService", ["$http", "$q", "$filter", function ($http, $q, $filter) {

		var normalize = $filter("normalize");

		function all () {

			var deferred = $q.defer();

			$http.get("/pokemons.json", {cache: true})
			.success(function (data) {

				deferred.resolve(data);
			});

			return deferred.promise;
		};

		function byName (name) {

			name = normalize(name);
			var deferred = $q.defer();

			all().then(function (data) {

				var results = data.filter(function (pokemon) {

					return normalize(pokemon.name) === name;
				});

				if(results.length > 0) {

					deferred.resolve(results[0]);
				} else {

					deferred.reject();
				}
			});

			return deferred.promise;
		};

		function byType (type) {

			type = normalize(type);
			var deferred = $q.defer();

			all().then(function (data) {

				var results = data.filter(function (pokemon) {

					return pokemon.type.some(function (t) {

						return normalize(t) === type;
					});
				});

				deferred.resolve(results);
			});

			return deferred.promise;
		};

		return {
			all: all,
			byName: byName,
			byType: byType
		};
	}]);
})();