;(function () {
  "use strict";

  angular
    .module("app")
    .controller("Imprimir", Imprimir);

  function Imprimir(
      $location
    , $window
    , Guia
    , Tela
  ) {
    var impr = this;
    ////////////////

    impr.guia = (function () {
      var guia = Guia.obter();

      if (angular.equals(guia, "{}")) {
        Tela.alertar("Erro", "Não foi possível obter alguns dados.");

        $location.path("/");
      }

      guia.numero = parseInt(guia.numero);

      return guia;
    })();

    impr.data = (new Date()).getTime();

    impr.imprimirGuia = function () {
      $window.print();
    }

    impr.voltarPraPaginaInicial = function () {
      $location.url("/");
    }
  }
})();
