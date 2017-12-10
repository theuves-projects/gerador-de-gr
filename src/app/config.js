;(function () {
  "use strict";

  angular
    .module("app")
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/controllers/Adicionar/template.html",
        controller: "Adicionar",
        controllerAs: "ad"
      })
      .when("/imprimir", {
        templateUrl: "app/controllers/Imprimir/template.html",
        controller: "Imprimir",
        controllerAs: "impr"
      })
      .when("/configurar", {
        templateUrl: "app/controllers/Configurar/template.html",
        controller: "Configurar",
        controllerAs: "conf"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
})();
