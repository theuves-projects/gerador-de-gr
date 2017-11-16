;(function () {
  "use strict";

  angular
    .module("indice.services")
    .service("Utilitarios", Utilitarios)
  ;

  /**
   * funções aleatórias que serão úteis
   */
  function Utilitarios() {

    // funções privadas
    ////////////////////

    /**
     * remover itens repetidos numa array
     */
    function removerRepetidos(array) {
      return array
        .map(function (item) {
          return angular.toJson(item);
        })
        .filter(function (item, indice, eu) {
          return eu.indexOf(item) === indice;
        })
        .map(function (item) {
          return angular.fromJson(item);
        })
      ;
    }

    /**
     * contar quantas vezes um item aparece numa array
     */
    function contarRepetidos(item, array) {

      /**
       * vai armazenar as vezes que tá aparecendo
       */
      var vezes = 0;

      array.forEach(function (itemDaArray) {
        if (itemDaArray === item) {
          vezes += 1;
        }
      });

      return vezes;
    };

    /**
     * completar itens com zeros
     *
     * menores que 100 apenas
     */
    function completarComZeros(numero) {
      numero = numero.toString();

      if (numero < 10) {
        numero = "0" + numero;
      }

      return numero;
    }

    // funções externas
    ////////////////////

    /**
     * remover item de uma array
     */
    this.removerItem = function(array, indice) {
      delete array[indice];

      return array.filter(function (item) {
        return item;
      });
    }

    /**
     * montar lista com os processos
     *
     * retorna uma array com arrays contendo:
     *  - item (ordem)
     *  - número do processo
     *  - volume
     *
     * "processos" deve ser uma array contendo
     * somente o número dos processos
     */
    this.montarLista = function (processos) {

      /**
       * listar a quantia de volumes de cada processo
       */
      processos = processos.map(function (
          numero
        , _
        , array
      ) {
        return [
            numero
          , contarRepetidos(numero, array)
        ];
      });

      /**
       * remove os processos repetidos
       */
      processos = removerRepetidos(processos)

        /**
         * adicionar zeros a esquerda no volume
         */
        .map(function (array) {
          array[1] = completarComZeros(array[1]);

          return array;
        })

        /**
         * adicionar ordem do item
         */
        .map(function (array, indice) {
          return {
              item: completarComZeros(indice + 1)
            , numero: array[0]
            , vol: array[1]
          }
        })
      ;

      return processos;
    };
  }
})();
