;(function () {
  "use strict";

  angular
    .module("app")
    .config(config)
  ;

  function config($routeProvider) {
    $routeProvider
      .when("/", {
        controller: "Configurar as vm",
        templateUrl: "app/configurar/index.html"
      })
      .when("/configurar", {
        redirectTo: "/"
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
