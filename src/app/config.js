;(function () {
  "use strict";

  angular
    .module("app")
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/controllers/Indice/template.html",
        controller: "Indice",
        controllerAs: "ind"
      })
      .when("/impressao", {
        templateUrl: "app/controllers/Impressao/template.html",
        controller: "Impressao",
        controllerAs: "impr"
      })
      .when("/configuracoes", {
        templateUrl: "app/controllers/Configuracoes/template.html",
        controller: "Configuracoes",
        controllerAs: "conf"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
})();
