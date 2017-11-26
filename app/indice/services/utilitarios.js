;(function () {
  "use strict";

  (angular)
  .module("indice.services")
  .service("Utilitarios", Utilitarios);

  function Utilitarios() {

    /**
     * funções privadas
     * ----------------
     */

    function removerRepetidos(array) {
      return array.map(function (item) {
        return angular.toJson(item);
      }).filter(function (item, indice, eu) {
        return eu.indexOf(item) === indice;
      }).map(function (item) {
        return angular.fromJson(item);
      });
    }

    function contarRepetidos(item, array) {
      var vezes = 0;

      array.forEach(function (itemDaArray) {
        if (itemDaArray === item) {
          vezes += 1;
        }
      });

      return vezes;
    };

    // (somente pra números menores que dez)
    function completarComZeros(numero) {
      numero = numero.toString();

      if (numero < 10) {
        numero = "0" + numero;
      }

      return numero;
    }

    /**
     * funções externas
     * ----------------
     */

    function removerItem(array, indice) {
      delete array[indice];

      return array.filter(function (item) {
        return item;
      });
    }

    /**
     * montar lista com os processos
     *
     * retorna uma array de arrays contendo:
     *  - item (ordem)
     *  - número do processo
     *  - volume
     *
     * "processos" deve ser uma array contendo
     * somente o número dos processos (em strings)
     */
    function montarLista(processos) {

      // contar volumes dos processos
      processos = processos.map(function (numero, _, array) {
        return [
          numero,
          contarRepetidos(numero, array)
        ];
      });

      processos = removerRepetidos(processos).map(function (array) {
        array[1] = completarComZeros(array[1]);

        return array;
      }).map(function (array, indice) {
        return {
          item: completarComZeros(indice + 1),
          numero: array[0],
          vol: array[1]
        };
      });

      return processos;
    }

    this.removerItem = removerItem;
    this.montarLista = montarLista;
  }
})();
