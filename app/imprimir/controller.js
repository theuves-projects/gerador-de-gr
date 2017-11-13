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
     * informa se o código de barras
     * deve ser exibido
     *
     * só pra testes
     *
     * 12/11/17
     */
    vm.cb = localStorage.cb === 'true';

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

    function imprimir() {
      $window.print();
    }

    function voltar() {
      $location.url("/");
    }

    /**
     * se for de Dourados, o lacre e o malote não vão aparecer
     */
    vm.ehPraDourados = Guia.ehPraDourados(guia.destinatario);;


    /**
     * informa a data exata em que foi gerada
     */
    vm.data = (new Date()).valueOf();

    vm.guia         = guia.guia;
    vm.destinatario = guia.destinatario;
    vm.malote       = guia.malote;
    vm.processos    = guia.processos;
  }
})();
