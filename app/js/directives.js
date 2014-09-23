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