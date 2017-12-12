;(function () {
  "use strict";

  angular
    .module("app")
    .controller("Imprimir", Imprimir);

  function Imprimir(
      $location
    , $window
    , Configuracoes
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

        return;
      }

      guia.numero = parseInt(guia.numero);

      return guia;
    })();

    impr.nomeDoUsuario = Configuracoes.obter("nomeDoUsuario");

    impr.data = Date.now();

    impr.imprimir = function () {
      $window.print();
    }

    impr.voltar = function () {
      $location.url("/");
    }
  }
})();
