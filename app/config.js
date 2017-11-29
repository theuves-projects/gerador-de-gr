;(function () {
  "use strict";

  (angular)
  .module("app")
  .config(config);

  function config($routeProvider) {
    $routeProvider
    .when("/", {
      controller: "Indice as vm",
      templateUrl: "app/Indice/index.html"
    })
    .when("/imprimir", {
      controller: "Imprimir as vm",
      templateUrl: "app/Imprimir/index.html"
    })
    .when("/configurar", {
      controller: "Configurar as vm",
      templateUrl: "app/Configurar/index.html"
    })
    .otherwise({
      redirectTo: "/"
    });
  }
})();
