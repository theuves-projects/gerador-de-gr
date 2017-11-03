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

    // pra não gerar uma guia vazia
    if (
         !guia.carga
      || !guia.destinatario
      || !guia.lacre
      || !guia.malote
      || !guia.processos
    ) {
      alert([
          "Houve algum erro!"
        , ""
        , "Não foi possível obter alguns dados."
      ].join("\n"));

      $location.path("/");
    }

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
