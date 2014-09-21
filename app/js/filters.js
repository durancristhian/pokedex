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

				return "/img/pokemons/" + $filter("normalize")(input) + ".jpg";
			};
		}]);
})();