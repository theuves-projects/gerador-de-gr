;(function () {
  "use strict";

  angular
    .module("imprimir.controller", [])
    .controller("Imprimir", Imprimir)
  ;

  function Imprimir(
      $location

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
     * se for de Dourados, o lacre e o malote não vão aparecer
     */
    vm.ehPraDourados = Guia.ehPraDourados(guia.destinatario);;


    /**
     * informa a data exata em que foi gerada
     */
    vm.data = (new Date()).valueOf();

    vm.carga        = guia.carga;
    vm.destinatario = guia.destinatario;
    vm.lacre        = guia.lacre;
    vm.malote       = guia.malote;
    vm.processos    = guia.processos;
  }
})();
