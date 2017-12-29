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

    cab.irPara = function (url) {
      if (cab.tahTdOk()) $location.url(url);
    };

    cab.iniciar = function () {
      configurarRelogio();

      // configurações

      function configurarRelogio() {
        var atualizarData = function () {
          cab.data = Date.now();
        };

        atualizarData();
        $interval(atualizarData, 1000);
      }
    };

    cab.tahTdOk = function () {
      var podeSair = cab.podeSair;
      var nFoiDefinido = angular.isUndefined(podeSair);

      if (nFoiDefinido) return true;
      if (podeSair) return true;

      var continuar = $window.confirm("Dados serão perdidos.\n\nContinuar?");
      return continuar;
    };
  }
})(window.angular);
