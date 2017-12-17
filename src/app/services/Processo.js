;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Processo", Processo);

  function Processo() {
    var proc = this;
    ////////////////

    proc.limpar = function (numero) {
      numero = numero
        .toString()
        .trim()
        .replace(/[+-.\s]/g, "");

      if (numero.length > 20) {
        numero = numero.replace(/\d{5}$/g, "");
      }

      return numero;
    };

    proc.eh = function (numero) {
      return /^(\d{12,13}|\d{20})$/.test(proc.limpar(numero));
    };

    proc.formatar = function (numero) {
      numero = proc.limpar(numero);

      var FormatarNumero = {
        antigo: function () {
          return numero.replace(/^(\d{3,4})(\d{2})(\d{6})(\d{1})$/, "$1.$2.$3-$4");
        },
        novo: function () {
          return numero.replace(/^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/, "$1-$2.$3.$4.$5.$6");
        }
      };

      var ehNumero = {
        antigo: numero.length === 12 || numero.length === 13,
        novo: numero.length === 20
      };

      if (ehNumero.antigo) {
        return FormatarNumero.antigo(numero);
      } else if (ehNumero.novo) {
        return FormatarNumero.novo(numero);
      } else {
        throw new Error("Número de processo inválido");
      }
    };
  }
})(this.angular);
