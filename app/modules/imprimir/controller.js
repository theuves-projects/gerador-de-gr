;(function () {
  "use strict";

  angular
    .module("imprimir")
    .controller("Imprimir", Imprimir);

  Imprimir.$inject = [
      "$location"
    , "$window"

    // personalizados
    , "Guia"
    , "Tela"
  ];

  function Imprimir(
      $location
    , $window
    , Guia
    , Tela
  ) {
    var vm = this;
    //////////////

    // procurar erros:
    // ===============

    var dadosDaGuia = Guia.obter();
    var temDadosNaGuia = angular.toJson(dadosDaGuia) !== "{}";

    if (!temDadosNaGuia) {
      Tela.alertar("Erro", "Não foi possível obter alguns dados.");

      $location.path("/");
    }

    // se não encontrar erros:
    // =======================

    // dados da guia
    vm.guia = parseInt(dadosDaGuia.numero);
    vm.destinatario = dadosDaGuia.destinatario;
    vm.malote = dadosDaGuia.malote;
    vm.processos = dadosDaGuia.processos;
    vm.naoVaiMalote = !dadosDaGuia.vaiMalote;

    // data
    vm.data = (new Date()).valueOf();

    // funções
    vm.imprimirGuia = imprimirGuia;
    vm.voltarPraPaginaInicial = voltarPraPaginaInicial;

    function imprimirGuia() {
      $window.print();
    }

    function voltarPraPaginaInicial() {
      $location.url("/");
    }
  }
})();
