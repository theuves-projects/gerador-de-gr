;(function (angular) {
  "use strict";

  angular
    .module("app")
    .controller("Impressao", Impressao);

  function Impressao(
      $location
    , $window
    , Configuracoes
    , Guia
  ) {
    var impr = this;
    ////////////////

    impr.data = Date.now();

    impr.guia = Guia;

    impr.usuario = Configuracoes.obter("usuario");

    impr.iniciar = function iniciar() {
      if (impr.guia.tahVazia()) {
        $window.alert("Nenhum dado!");
        $location.url("/");
      }
    };

    impr.imprimir = function imprimir() {
      $window.print();
    };

    impr.voltar = function voltar() {
      $location.url("/");
    };
  }
})(this.angular);
