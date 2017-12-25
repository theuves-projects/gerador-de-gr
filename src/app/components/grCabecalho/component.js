;(function (angular) {
  "use strict";

  angular
    .module("app")
    .component("grCabecalho", config());

  function config() {
    return {
      bindings: {
        "titulo": "@",
        "btPrinc": "@",
        "btPrincFa": "@",
        "btPrincCor": "@",
        "btPrincClick": "&",
        "btPrincDesc": "@",
        "podeSair": "&?"
      },
      controller: Cabecalho,
      controllerAs: "cab",
      templateUrl: "app/components/grCabecalho/template.html"
    };
  }

  /* @ngInject */
  function Cabecalho(
      $location
    , $window
    , $interval
  ) {
    var cab = this;
    ///////////////

    cab.data = Date.now();

    cab.path = $location.path();

    cab.tahTdOk = function () {
      var MENSAGEM = "Dados serão perdidos.\n\nContinuar?";

      return !cab.hasOwnProperty("podeSair")
        || cab.podeSair()
        || $window.confirm(MENSAGEM);
    };

    cab.criarNovo = function () {
      if (cab.tahTdOk()) $location.url("/");
    };

    cab.verHistorico = function () {
      if (cab.tahTdOk()) $location.url("/historico");
    };

    cab.verConfiguracoes = function () {
      if (cab.tahTdOk()) $location.url("/configuracoes");
    };
  }
})(window.angular);
