;(function () {
  "use strict";

  angular
    .module("configurar.services", [])

    /**
     * services
     */
    .service("Processo", Processo)
    .service("Utilitarios", Utilitarios)
  ;

  /**
   * "Processo"
   *
   * funções pra manipular números de processos
   */
  function Processo() {

    /**
     * funções privadas
     * ----------------
     */

    /**
     * desformatar número
     * e remover itens desnecessários
     */
    function limpar(numero) {

      /**
       * desformatar
       */
      numero = numero.replace(/[+-.\s]/g, "");

      /**
       * remover itens desnecessários
       *
       * (em alguns processos [da vara do trabalho]
       * escaneados foi encontrado alguns números [5]
       * no final que não são necessários)
       */
      if (!/^\d{20}$/.test(numero)) {
        numero = numero.replace(/\d{5}$/g, "");
      }

      return numero;
    }

    /**
     * funcões públicas
     * ----------------
     */

    /**
     * verificar se é um número de processo
     *
     * obs.: não valida
     */
    this.eh = function (numero) {
      return /^\d{20}$/
        .test(
          limpar(numero)
        )
      ;
    };

    /**
     * formatar um número de processo
     */
    this.formatar = function (numero) {
      return limpar(numero)
        .toString()
        .replace(
            /^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/
          , "$1-$2.$3.$4.$5.$6"
        )
      ;
    };
  }

  /**
   * "Utilitarios"
   *
   * funções aleatórias que serão úteis
   */
  function Utilitarios() {

    /**
     * contar quantas vezes um item aparece numa array
     */
    this.contarRepetidos = function (item, array) {

      /**
       * vai armazenar as vezes que está aparecendo
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
     * remover itens repetidos num array
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
     * completar itens com zeros
     *
     * menores que 100 apenas
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
