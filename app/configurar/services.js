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
      if (numero.length > 20) {
        numero = numero.replace(/\d{5}$/g, "");
      }

      return numero;
    }

    /**
     * completar ano
     *
     * de 2 dígitos pra 4 dígitos
     *
     * ex.: 00 -> 2000
     */
    function completarAno(ano) {
      ano = ano.toString();

      if (ano.length === 2) {

        /**
         * pr'o século XX vai ser utilizado
         * somente os acima do ano 1980
         */
        if (ano >= 80) {
          ano = "19" + ano
        } else {

          /**
           * pr'o século XXI
           */
          ano = "20" + ano;
        }
      }

      return ano;
    }

    /**
     * completar números com zeros
     *
     * função obtida no stackoverflow (pt) questão 175662
     *
     * [adaptado]
     */
    function completarComZeros(numero, zeros) {
      var tamanho = zeros - numero.toString().length + 1;

      return Array(tamanho).join("0") + numero;
    }

    /**
     * funções pra obter os dígitos
     * verficadores do número de um processo
     */
    function obterDigitosVerificadores(
        nnnnnnn
      , aaaa
      , jtr
      , oooo
    ) {
      nnnnnnn = completarComZeros(nnnnnnn, 7);
      aaaa = completarComZeros(aaaa, 4);
      jtr = completarComZeros(jtr, 3);
      oooo = completarComZeros(oooo, 4);

      var r1 = nnnnnnn % 97;
      var r2 = (completarComZeros(r1, 2) + aaaa) % 97;
      var r3 = (completarComZeros(r2, 2) + jtr) % 97;
      var r4 = (completarComZeros(r3, 2) + oooo) % 97;
      var r5 = (completarComZeros(r4, 2) + "00") % 97;

      return completarComZeros(98 - (r5 % 97), 2);
    }

    /**
     * converter números de
     * processos antigos pr'o formato novo
     */
    function converter(numero, jtr) {
      numero = limpar(numero.toString());
      jtr = jtr.toString();

      /**
       * se for um número de processo completos
       *
       * (isso nunca deve dar erro)
       */
      if (
           numero.length === 13
        && jtr.length === 3) {

        numero = numero
          .match(/(\d{4})(\d{2})(\d{7})/)
          .splice(1)
        ;

        var digitos = {
            nnnnnnn: numero[2]
          , aaaa   : completarAno(numero[1])
          , jtr    : jtr
          , oooo   : numero[0]
        };

        var dd = obterDigitosVerificadores(
            digitos.nnnnnnn
          , digitos.aaaa
          , digitos.jtr
          , digitos.oooo
        );

        return digitos.nnnnnnn
          + dd
          + digitos.aaaa
          + digitos.jtr
          + digitos.oooo
        ;
      } else {
        throw new Error("Número de processo inválido!");
      }
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
      return /^(\d{13}|\d{20})$/
        .test(
          limpar(numero)
        )
      ;
    };

    /**
     * formatar um número de processo
     */
    this.formatar = function (numero, jtr) {

      /**
       * se for no formato antigo
       */
      if (/^\d{13}$/.test(numero)) {
        numero = converter(numero, jtr);
      }

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
     * remover itens repetidos numa array
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
