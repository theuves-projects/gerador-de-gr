;(function () {
  "use strict";

  angular
    .module("app")
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/constrollers/Adicionar/template.html",
        controller: "Adicionar",
        controllerAs: "adic"
      })
      .when("/imprimir", {
        templateUrl: "app/constrollers/Imprimir/template.html",
        controller: "Imprimir",
        controllerAs: "vm"
      })
      .when("/configurar", {
        templateUrl: "app/constrollers/Configurar/template.html",
        controller: "Configurar",
        controllerAs: "vm"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
})();
