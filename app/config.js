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
      .when("/configurar", {
        controller: "Configurar as vm",
        templateUrl: "app/configurar/index.html"
      })
      .otherwise({
        redirectTo: "/"
      })
    ;
  }
})();
