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
  ];

  function Imprimir(
      $location
    , $window
    , Guia
  ) {
    var vm = this;
    //////////////

    // procurar erros:
    // ===============

    var dadosDaGuia = Guia.obter();
    var temDadosNaGuia = angular.toJson(dadosDaGuia) !== "{}";

    if (!temDadosNaGuia) {
      alert("[Erro]\n\n"
        + "Não foi possível obter alguns dados.");

      $location.path("/");
    }

    // se não encontrar erros:
    // =======================

    // dados da guia
    vm.guia = parseInt(dadosDaGuia.guia);
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
