;(function () {
  "use strict";

  (angular)
  .module("app")
  .config(config);

  function config($routeProvider) {
    $routeProvider
    .when("/", {
      controller: "Indice as vm",
      templateUrl: "app/modules/indice/web/index.html"
    })
    .when("/imprimir", {
      controller: "Imprimir as vm",
      templateUrl: "app/modules/imprimir/web/index.html"
    })
    .when("/configurar", {
      controller: "Configurar as vm",
      templateUrl: "app/modules/configurar/web/index.html"
    })
    .otherwise({
      redirectTo: "/"
    });
  }
})();
