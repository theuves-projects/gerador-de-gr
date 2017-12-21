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
        "podeSair": "&"
      },
      controller: Cabecalho,
      controllerAs: "cab",
      templateUrl: "app/components/grCabecalho/template.html"
    };
  }

  /* @ngInject */
  function Cabecalho(
      $scope
    , $location
    , $window
  ) {
    var cab = this;
    ///////////////

    cab.data = Date.now();

    cab.path = $location.path();

    cab.tahTdOk = function tahTdOk() {
      var MENSAGEM = "Dados serão perdidos.\n\nContinuar?";

      var fazer = !$scope.cab.podeSair()
        ? $window.confirm(MENSAGEM)
        : true;

      return fazer;
    };

    cab.criarNovo = function criarNovo() {
      if (cab.tahTdOk()) {
        $location.url("/");
        $window.location.reload();
      }
    };

    cab.verHistorico = function verHistorico() {
      if (cab.tahTdOk()) $location.url("/historico");
    };

    cab.verConfiguracoes = function verConfiguracoes() {
      if (cab.tahTdOk()) $location.url("/configuracoes");
    };
  }
})(window.angular);
