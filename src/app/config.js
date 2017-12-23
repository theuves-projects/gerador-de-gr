;(function (angular) {
  "use strict";

  angular
    .module("app")
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when("/", use("Indice", "ind"))
      .when("/configuracoes", use("Configuracoes", "conf"))
      .when("/historico", use("Historico", "hist"))
      .when("/impressao/:data", use("Impressao", "impr"))
      .otherwise({
        redirectTo: "/"
      });

    function url(controller) {
      var DIR = "app/controllers";
      var FILE = "template.html";

      return  DIR+"/"+controller+"/"+FILE;
    }

    function use(controller, as) {
      return {
        controller: controller,
        controllerAs: as,
        templateUrl: url(controller)
      };
    }
  }
})(window.angular);
