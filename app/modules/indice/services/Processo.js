;(function () {
  "use strict";

  angular
    .module("indice")
    .service("Processo", Processo);

  function Processo() {

    // funções
    this.eh = eh;
    this.formatar = formatar;

    // (privado)
    function limpar(numero) {
      numero = numero
        .toString()
        .trim()
        .replace(/[+-.\s]/g, "");

      /**
       * (em alguns processos, da vara do trabalho, escaneados
       * foi encontrado alguns números no final que não são
       * necessários - isso remove-os)
       */
      if (numero.length > 20) {
        numero = numero.replace(/\d{5}$/g, "");
      }

      return numero;
    }

    // (obs.: não valida)
     function eh(numero) {
      return /^(\d{12,13}|\d{20})$/.test(limpar(numero));
    };

    function formatar(numero) {
      numero = limpar(numero);

      var FormatarNumero = {
        antigo: function(num) {
          return numero.replace(
            /^(\d{3,4})(\d{2})(\d{6})(\d{1})$/, "$1.$2.$3-$4"
          );
        },
        novo: function (num) {
          return numero.replace(
            /^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/, "$1-$2.$3.$4.$5.$6"
          );
        }
      }

      var ehNumero = {
          antigo: numero.length === 12 || numero.length === 13
        , novo: numero.length === 20
      };

      if (ehNumero.antigo) {
        return FormatarNumero.antigo(numero);
      } else if (ehNumero.novo) {
        return FormatarNumero.novo(numero);
      } else {
        throw new Error("Número de processo inválido");
      }
    }
  }
})();
