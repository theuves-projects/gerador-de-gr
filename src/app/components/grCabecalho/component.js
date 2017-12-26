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

    cab.path = $location.path();

    cab.iniciar = function () {
      configurarRelogio();

      // configurações
      // -------------

      function configurarRelogio() {
        var atualizarData = function () {
          cab.data = Date.now();
        };

        atualizarData();
        $interval(atualizarData, 1000);
      }
    };

    cab.tahTdOk = function () {
      var MENSAGEM = "Dados serão perdidos.\n\nContinuar?";

      return !("podeSair" in cab)
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
