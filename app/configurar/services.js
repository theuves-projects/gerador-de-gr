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

    /**
     * obter o destinatário a partir do número
     * do percurso (no amlote)
     */
    this.obterDestinatario = function (percurso) {

      /**
       * lista de percursos
       */
      var percursos = {
        "305764": {
          cidade: "amambai",
          vara: "vara do trabalho"
        },
        "253427": {
          cidade: "amambai",
          vara: "1ª vara estadual"
        },
        "253428": {
          cidade: "amambai",
          vara: "2ª vara estadual"
        },
        "280409": {
          cidade: "bela vista",
          vara: "vara estadual"
        },
        "245810": {
          cidade: "caarapo",
          vara: "vara estadual"
        },
        "245815": {
          cidade: "deodápolis",
          vara: "vara estadual"
        },
        "305753": {
          cidade: "dourados",
          vara: "1ª vara do trabalho"
        },
        "305755": {
          cidade: "dourados",
          vara: "2ª vara do trabalho"
        },
        "245808": {
          cidade: "eldourado",
          vara: "vara estadual"
        },
        "305769": {
          cidade: "fátima do sul",
          vara: "vara do trabalho"
        },
        "245793": {
          cidade: "fátima do sul",
          vara: "1ª vara estadual"
        },
        "245794": {
          cidade: "fátima do sul",
          vara: "2ª vara estadual"
        },
        "245809": {
          cidade: "iguatemi",
          vara: "vara estadual"
        },
        "245812": {
          cidade: "itaporã",
          vara: "vara estadual"
        },
        "246911": {
          cidade: "itaquiraí",
          vara: "vara estadual"
        },
        "245795": {
          cidade: "ivinhema",
          vara: "1ª vara estadual"
        },
        "245796": {
          cidade: "ivinhema",
          vara: "2ª vara estadual"
        },
        "305759": {
          cidade: "jardim",
          vara: "vara do trabalho"
        },
        "245813": {
          cidade: "jardim",
          vara: "1ª vara estadual"
        },
        "245814": {
          cidade: "jardim",
          vara: "2ª vara estadual"
        },
        "245798": {
          cidade: "maracaju",
          vara: "1ª vara estadual"
        },
        "245799": {
          cidade: "maracaju",
          vara: "2ª vara estadual"
        },
        "305766": {
          cidade: "mundo novo",
          vara: "vara do trabalho"
        },
        "245807": {
          cidade: "mundo novo",
          vara: "vara estadual"
        },
        "305762": {
          cidade: "naviraí",
          vara: "vara do trabalho"
        },
        "245802": {
          cidade: "naviraí",
          vara: "1ª vara estadual"
        },
        "245803": {
          cidade: "naviraí",
          vara: "2ª vara estadual"
        },
        "245800": {
          cidade: "nova alvorada do sul",
          vara: "vara estadual"
        },
        "305756": {
          cidade: "nova andradina",
          vara: "vara do trabalho"
        },
        "245816": {
          cidade: "nova andradina",
          vara: "1ª vara estadual"
        },
        "245817": {
          cidade: "nova andradina",
          vara: "2ª vara estadual"
        },
        "331870": {
          cidade: "ponta porã",
          vara: "1ª vara federal"
        },
        "10377913": {
          cidade: "ponta porã",
          vara: "1ª vara federal"
        },
        "10377914": {
          cidade: "ponta porã",
          vara: "2ª vara federal"
        },
        "305761": {
          cidade: "ponta porã",
          vara: "vara do trabalho"
        },
        "245801": {
          cidade: "rio brilhante",
          vara: "vara estadual"
        }
      };

      /**
       * converter em número (removendo os zeros)
       */
      percurso = parseInt(percurso);

      /**
       * obter o percurso
       */
      percurso = percursos[percurso];

      return percurso.vara
        + " de "
        + percurso.cidade
        + "/ms"
      ;
    };
  }
})();
