;(function (angular) {
  "use strict";

  angular
    .module("app")
    .component("grGuia", config());

  function config() {
    return {
      bindings: {
        data: "=",
        usuario: "=",
        numero: "=",
        malote: "=",
        destinatario: "=",
        processos: "="
      },
      controller: Guia,
      controllerAs: "guia",
      templateUrl: "app/components/grGuia/template.html"
    };
  }

  function Guia() {
    var guia = this;
    ////////////////

  }
})(window.angular);
