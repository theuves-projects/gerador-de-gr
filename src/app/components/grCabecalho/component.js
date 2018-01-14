;(function (angular) {
  "use strict";

  angular
    .module("app")
    .component("grCabecalho", config());

  function config() {
    return {
      bindings: {
        "podeSair": "&"
      },
      controller: Cabecalho,
      controllerAs: "cab",
      templateUrl: "app/components/grCabecalho/template.html",
      transclude: true
    };
  }

  /* @ngInject */
  function Cabecalho(
    $location,
    $window,
    $interval
  ) {
    var cab = this;
    ///////////////

    cab._iniciar = function () {
      cab.data = Date.now();

      $interval(function () {
        cab.data = Date.now();
      }, 1000);
    };

    cab.path = $location.path();

    cab.novo = function () {
      if (cab.path === "/" && cab.tahPronto()) {
        $window.location.reload();
      } else {
        cab.irPara("/");
      }
    };

    cab.irPara = function (url) {
      if (cab.tahPronto()) $location.url(url);
    };

    cab.tahPronto = function () {
      if (cab.podeSair()) return true;

      var continuar = $window.confirm("Dados serão perdidos.\n\nContinuar?");
      return continuar;
    };
  }
})(window.angular);
