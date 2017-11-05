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

    /**
     * funções
     * -------
     */
    vm.ler = ler;

    ///

    function ler() {
      var processos = vm.processos;
      var ehPraDourados = Guia.ehPraDourados(vm.destinatario);

      if (
           processos
        && vm.carga
        && (ehPraDourados ? true : vm.lacre)
        && (ehPraDourados ? true : vm.malote)
        && vm.destinatario
      ) {
        processos = processos
          .split("\n")
          .filter(function (numero) {
            var eh = Processo.eh(numero);

            if (!eh) {
              alert("O número \"" + numero +  "\" é inválido!");
            }

            return eh;
          })
          .map(function (numero) {
            var jtr;

            /**
             * pr'o caso de haver números antigos
             */
            if (/\bfederal\b/.test(vm.destinatario)) {
              jtr = "403";
            } else if (/\btrabalho\b/.test(vm.destinatario)) {
              jtr = "524";
            } else {

              /**
               * se for estadual
               */
              jtr = "812";
            }

            return Processo.formatar(numero, jtr);
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

        if (processos.length === 0) {

          alert("Nenhum dos dados informados é válido!")
        } else {
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
        }

      } else {
        alert("Preencha todo o formulário!");
      }
    }
  }
})();
