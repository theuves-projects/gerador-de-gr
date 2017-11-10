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
      numero = numero
        .toString()
        .trim()
        .replace(/[+-.\s]/g, "")
      ;

      /**
       * remover itens desnecessários
       *
       * (em alguns processos [da vara do trabalho]
       * escaneados foi encontrado alguns números [5]
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

  /**
   * "Utilitarios"
   *
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
        , _ // (não vai ter uso)
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

    /**
     * função pra obter o número e o
     * percurso dum malote pelo código de barras
     *
     * o código de barras tem 35 dígitos
     *
     * 10/11/17
     */
    this.malote = function (codigoDeBarras) {

      /**
       * verificar se é uma string
       */
      if (typeof codigoDeBarras !== "string") {
        throw new Error("Deve ser uma string.");
      }

      /**
       * verificar se é um código de barras válido
       */
      if (codigoDeBarras.length !== 35) {
        throw new Error("Código de barras inválido.");
      }

      /**
       * expressão regular pra obter os dados necessários
       *
       * $1 - percurso
       * $2 - número
       */
      var regex = /^\d{13}(\d{12})\d{5}(\d{5})$/;

      /**
       * obter os dados
       */
      var dados = codigoDeBarras
        .match(regex)
        .splice(1)
      ;

      /**
       * tchau
       */
      return {
          percurso: dados[0]
        , numero: dados[1]
      }
    };
  }
})();
