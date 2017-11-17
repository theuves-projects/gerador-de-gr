;(function () {
  "use strict";

  angular
    .module("imprimir.controller", [])
    .controller("Imprimir", Imprimir)
  ;

  function Imprimir(
      $window
    , $location

    /**
     * personalizados
     */
    , Guia
  ) {
    var vm = this;
    var guia = Guia.obter();

    /**
     * se a página só foi recarregada
     */
    if (angular.toJson(guia) === "{}") {
      alert([
          "Houve algum erro!"
        , ""
        , "Não foi possível obter alguns dados."
      ].join("\n"));

      $location.path("/");
    }

    /**
     * chamando funções
     * ----------------
     */

    vm.imprimir = imprimir;
    vm.voltar = voltar;

    /**
     * funções
     * -------
     */

    /**
     * função pra imprimir guia
     */
    function imprimir() {
      $window.print();
    }

    /**
     * função pra voltar pra página inicial
     */
    function voltar() {
      $location.url("/");
    }

    /**
     * verificar se vai malote,
     * caso contrário não vai aparecer o
     * número do malote
     */
    vm.naoTemMalote = Guia.naoTemMalote(guia.destinatario);;


    /**
     * informa a data exata em que foi gerada
     */
    vm.data = (new Date()).valueOf();

    /**
     * adiciona os dados
     */
    vm.guia         = parseInt(guia.guia);
    vm.destinatario = guia.destinatario;
    vm.malote       = guia.malote;
    vm.processos    = guia.processos;
  }
})();
