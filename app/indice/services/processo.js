;(function () {
  "use strict";

  angular
    .module("indice.services")
    .service("Processo", Processo)
  ;

  /**
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
      numero = numero
        .toString()
        .trim()
        .replace(/[+-.\s]/g, "")
      ;

      /**
       * remover itens desnecessários
       *
       * (em alguns processos, da vara do trabalho,
       * escaneados foi encontrado alguns números
       * no final que não são necessários)
       */
      if (numero.length > 20) {
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
      return /^(\d{12,13}|\d{20})$/
        .test(
          limpar(numero)
        )
      ;
    };

    /**
     * formatar um número de processo
     */
    this.formatar = function (numero) {

      /**
       * converter em string e limpar
       */
      numero = limpar(numero);

      /**
       * se for um processo com 12 ou 13 dígitos
       */
      if (numero.length === 12 || numero.length === 13) {
        return numero
          .replace(
              /^(\d{3,4})(\d{2})(\d{6})(\d{1})$/
            , "$1.$2.$3-$4"
          )
        ;
      }

      /**
       * se for um processo com 20 dígitos
       */
      if (numero.length === 20) {
        return numero
          .replace(
              /^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/
            , "$1-$2.$3.$4.$5.$6"
          )
        ;
      }
    };
  }
})();
