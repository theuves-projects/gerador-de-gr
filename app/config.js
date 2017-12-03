;(function () {
  "use strict";

  angular
    .module("app")
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/modules/adicionar/web/index.html",
        controller: "Adicionar",
        controllerAs: "vm"
      })
      .when("/imprimir", {
        templateUrl: "app/modules/imprimir/web/index.html",
        controller: "Imprimir",
        controllerAs: "vm"
      })
      .when("/configurar", {
        templateUrl: "app/modules/configurar/web/index.html",
        controller: "Configurar",
        controllerAs: "vm"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
})();
