;(function (angular) {
  "use strict";

  angular
    .module("app")
    .component("grCabecalho", config());

  function config() {
    return {
      bindings: {
        "podeSair": "&?"
      },
      controller: Cabecalho,
      controllerAs: "cab",
      templateUrl: "app/components/grCabecalho/template.html",
      transclude: true
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

    cab._iniciar = function () {
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

    cab.path = $location.path();

    cab.irPara = function (url) {
      if (cab.tahTdOk()) $location.url(url);
    };

    cab.tahTdOk = function () {
      var podeSair = cab.podeSair;
      var ehIndefinido = angular.isUndefined(podeSair);

      if (ehIndefinido || podeSair) return true;

      var continuar = $window.confirm("Dados serão perdidos.\n\nContinuar?");
      return continuar;
    };
  }
})(window.angular);
