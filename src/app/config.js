;(function () {
  "use strict";

  angular
    .module("app")
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/modules/adicionar/index.html",
        controller: "Adicionar",
        controllerAs: "adic"
      })
      .when("/imprimir", {
        templateUrl: "app/modules/imprimir/index.html",
        controller: "Imprimir",
        controllerAs: "vm"
      })
      .when("/configurar", {
        templateUrl: "app/modules/configurar/index.html",
        controller: "Configurar",
        controllerAs: "vm"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
})();
