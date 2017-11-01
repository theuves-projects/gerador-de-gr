;(function () {
  "use strict";

  angular
    .module("controllers", [])
    .controller("Main", Main)
  ;

  function Main(
        Processo
      , Utilitarios
    ) {

    var vm = this;

    ///

    vm.data = moment(new Date()).format('DD/MM/YYYY HH:mm');

    ///

    vm.numeros = "";
    vm.processos = [];

    /**
     * funções.
     */
    vm.ler = ler;

    function ler() {
      var numeros = vm.numeros;

      if (numeros) {
        numeros = numeros
          .split("\n")
          .filter(function (numero) {
            return Processo.eh(numero);
          })
          .map(function (numero) {
            return Processo.formatar(numero);
          })
          .map(function (numero, indice, array) {
            return [
                numero
              , Utilitarios.contarRepetidos(numero, array)
            ];
          })
        ;

        numeros = Utilitarios.removerRepetidos(numeros)
          .map(function (array) {
            array[1] = Utilitarios.completarComZeros(array[1]);

            return array;
          })
          .map(function (array, indice) {
            return [Utilitarios.completarComZeros(indice + 1)]
              .concat(array)
            ;
          })
        ;

        vm.processos = numeros;
      } else {
        alert("Nada informado!");
      }
    }
  }
})();
