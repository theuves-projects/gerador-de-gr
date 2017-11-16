;(function () {
  "use strict";

  angular
    .module("app")
    .config(config)
  ;

  function config($routeProvider) {
    $routeProvider
      .when("/", {
        controller: "Indice as vm",
        templateUrl: "app/indice/index.html"
      })
      .when("/imprimir", {
        controller: "Imprimir as vm",
        templateUrl: "app/imprimir/index.html"
      })
      .otherwise({
        redirectTo: "/"
      })
    ;
  }
})();
