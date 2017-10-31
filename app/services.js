;(function () {
  "use strict";

  angular
    .module("services", [])
    .service("Processo", Processo)
    .service("Utilitarios", Utilitarios)
  ;

  /**
   * funções pra manipular números de um processo.
   */
  function Processo() {

    /**
     * verificar se é um número de processo.
     *
     * obs.: não valida.
     */
    this.eh = function (numero) {
      return /^\d{20}$/
        .test(
          numero.trim()
        )
      ;
    };

    /**
     * formatar um número de processo.
     */
    this.formatar = function (numero) {
      return numero
        .toString()
        .trim()
        .replace(
            /^(\d{7})(\d{2})(\d{4})(\d{3})(\d{4})$/
          , "$1-$2.$3.$4.$5"
        )
      ;
    };
  }

  /**
   * apenas funções aleatórias que vão ser úteis.
   */
  function Utilitarios() {

    /**
     * contar quantas vezes um item aparece numa array.
     */
    this.contarRepetidos = function (item, array) {

      /**
       * vai armazenar as vezes que está aparecendo.
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
     * remover itens repetidos num array.
     */
    this.removerRepetidos = function (array) {
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
    };

    /**
     * completar itens com zeros.
     *
     * menores que 100 apenas.
     */
    this.completarComZeros = function (numero) {
      numero = numero.toString();

      if (numero < 10) {
        numero = "0" + numero;
      }

      return numero;
    };
  }
})();
