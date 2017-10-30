;(function () {
  "use strict";

  angular
    .module("controllers", [])
    .controller("Main", Main)
  ;

  function Main(Processo) {
    var vm = this;

    vm.ler = function () {
      var processos = vm.processos
        .split("\n")
        .filter(function (numero) {
          return Processo.eh(numero);
        })
        .map(function (numero) {
          return Processo.formatar(numero);
        })
      ;

      console.log(processos.join("\n"));
    }
  }
})();
