;(function () {
  "use strict";

  angular
    .module("imprimir.controller", [])
    .controller("Imprimir", Imprimir)
  ;

  function Imprimir(Guia) {
    var vm = this;
    var guia = Guia.obter();

    vm.carga        = guia.carga;
    vm.destinatario = guia.destinatario;
    vm.lacre        = guia.lacre;
    vm.malote       = guia.malote;
    vm.processos    = guia.processos;
  }
})();
