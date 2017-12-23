;(function (angular) {
  "use strict";

  angular
    .module("app")
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: url("Indice"),
        controller: "Indice",
        controllerAs: "ind"
      })
      .when("/configuracoes", {
        templateUrl: url("Configuracoes"),
        controller: "Configuracoes",
        controllerAs: "conf"
      })
      .when("/historico", {
        templateUrl: url("Historico"),
        controller: "Historico",
        controllers: "hist"
      })
      .when("/impressao/:data", {
        templateUrl: url("Impressao"),
        controller: "Impressao",
        controllerAs: "impr"
      })
      .otherwise({
        redirectTo: "/"
      });

    function url(controller) {
      var dir = "app/controllers";
      var file = "template.html";

      return  dir + "/" + controller + "/" + file;
    }
  }
})(window.angular);
