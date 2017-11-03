;(function () {
  "use strict";

  angular
    .module("configurar.controller", [])
    .controller("Configurar", Configurar)
  ;

  function Configurar(
      $location

    /**
     * personalizados
     */
    , Guia
    , Processo
    , Utilitarios
  ) {
    var vm = this;

    vm.destinatario = "VARA DO TRABALHO DE AMAMBAI/MS";

    /**
     * funções
     * -------
     */
    vm.ler = ler;

    ///

    function ler() {
      var processos = vm.processos;

      if (processos) {
        processos = processos
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

        processos = Utilitarios.removerRepetidos(processos)
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

        Guia.definir(
            vm.carga
          , vm.destinatario
          , vm.lacre
          , vm.malote

          /**
           * array com processos
           * que acabou de ser analisada
           */
          , processos
        );

        $location.url("/imprimir");
      } else {
        alert("Nada informado!");
      }
    }
  }
})();
