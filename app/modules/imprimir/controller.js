;(function () {
  "use strict";

  (angular)
  .module("imprimir")
  .controller("Imprimir", Imprimir);

  function Imprimir(
      $location
    , $window

    // personalizados
    , Guia
  ) {
    var vm = this;
    //////////////

    var dadosDaGuia = Guia.obter();
    var naoTemDadosNaGuia = angular.toJson(dadosDaGuia) === "{}";

    if (naoTemDadosNaGuia) {
      alert("Houve algum erro!\n\n"
        + "Não foi possível obter alguns dados.");

      $location.path("/");
    }

    /**
     * funções
     * -------
     */

    function imprimirGuia() {
      $window.print();
    }

    function voltarPraPaginaInicial() {
      $location.url("/");
    }

    // (data em que a guia foi gerada)
    vm.data = (new Date()).valueOf();

    vm.guia = parseInt(dadosDaGuia.guia);
    vm.destinatario = dadosDaGuia.destinatario;
    vm.malote = dadosDaGuia.malote;
    vm.processos = dadosDaGuia.processos;
    vm.naoVaiMalote = !dadosDaGuia.vaiMalote;
    vm.imprimirGuia = imprimirGuia;
    vm.voltarPraPaginaInicial = voltarPraPaginaInicial;
  }
})();
