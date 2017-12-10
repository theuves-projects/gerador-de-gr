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

      if (Guia.tahVazia()) {
        Tela.alertar("Erro", "Nenhum dado adicionado.");

        $location.path("/");
      }

      guia.numero = parseInt(guia.numero);

      return guia;
    })();

    impr.data = (new Date()).getTime();

    impr.imprimir = function () {
      $window.print();
    }

    impr.voltar = function () {
      $location.url("/");
    }
  }
})();
