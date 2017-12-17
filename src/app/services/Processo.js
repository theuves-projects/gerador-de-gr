;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Processo", Processo);

  function Processo() {
    var proc = this;
    ////////////////

    proc.limpar = function limpar(numero) {
      var limpo = numero
        .toString()
        .trim()
        .replace(/[+-.\s]/g, "");

      return limpo.length > 20
        ? numero.replace(/\d{5}$/g, "")
        : limpo;
    };

    proc.eh = function eh(numero) {
      return /^(\d{12,13}|\d{20})$/.test(proc.limpar(numero));
    };

    proc.formatarAntigo = function formatarAntigo(numero) {
      var regex = /^(\d{3,4})(\d{2})(\d{6})(\d{1})$/;
      var mascara = "$1.$2.$3-$4";

      return numero.replace(regex, mascara);
    };

    proc.formatarNovo = function formatarNovo(numero) {
      var regex = /^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/;
      var mascara = "$1-$2.$3.$4.$5.$6";

      return numero.replace(regex, mascara);
    };

    proc.formatar = function formatar(numero) {
      if (proc.eh(numero)) {
        var desformatado = proc.limpar(numero);
        var ehAntigo = desformatado.length === 12 || desformatado.length === 13;

        if (ehAntigo) return proc.formatarAntigo(desformatado);
        return proc.formatarNovo(desformatado);
      }
    };
  }
})(this.angular);
