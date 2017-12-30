;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Processo", Processo);

  function Processo() {
    var proc = this;
    ////////////////

    proc.ehValido = function (numero) {
      return /^(\d{12,13}|\d{15}|\d{20})$/.test(proc.limpar(numero));
    };

    proc.formatar = function (numero) {
      if (proc.ehValido(numero)) {
        var desformatado = proc.limpar(numero);
        var ehAntigo = desformatado.length === 12 || desformatado.length === 13;
        var ehSimplificado = desformatado.length === 15;

        if (ehAntigo) return proc.formatarAntigo(desformatado);
        if (ehSimplificado) return proc.formatarNumSimplificado(desformatado);

        return proc.formatarNovo(desformatado);
      }

      return numero;
    };

    proc.formatarAntigo = function (numero) {
      var regex = /^(\d{3,4})(\d{2})(\d{6})(\d{1})$/;
      var mascara = "$1.$2.$3-$4";

      return numero.replace(regex, mascara);
    };

    proc.formatarNovo = function (numero) {
      var regex = /^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/;
      var mascara = "$1-$2.$3.$4.$5.$6";

      return numero.replace(regex, mascara);
    };

    proc.formatarNumSimplificado = function (numero) {
      var re = /^(\d{4})(\d{2})(\d{2})(\d{6})(\d)$/;
      var mask = "$1.$2.$3.$4-$5";

      return numero.replace(re, mask);
    };

    proc.limpar = function (numero) {
      var limpo = numero
        .toString()
        .trim()
        .replace(/[+-.\s]/g, "");

      return limpo.length > 20
        ? limpo.replace(/\d{5}$/g, "")
        : limpo;
    };
  }
})(window.angular);
