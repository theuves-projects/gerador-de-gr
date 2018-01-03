;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Processo", Processo);

  function Processo() {
    var proc = this;
    ////////////////

    proc.desformatar = function (numero) {
      var emStr = numero.toString();
      var aparado = emStr.trim();
      var desformatado = aparado.replace(/[+-.\s]/g, "");

      // nenhum número de processo desformatado tem mais de 20 caracteres.
      var temDadosDesnecessarios = desformatado.length > 20;
      if (temDadosDesnecessarios) return limpo.replace(/\d{5}$/g, "");

      return desformatado;
    };

    proc.ehAntigo = function (numero) {
      var desformatado = proc.desformatar(numero);
      var eh = /^\d{12,13}$/.test(desformatado);

      return eh;
    };

    proc.ehSimplificado = function (numero) {
      var desformatado = proc.desformatar(numero);
      var eh = desformatado.length === 15;

      return eh;
    };

    proc.ehValido = function (numero) {
      var desformatado = proc.desformatar(numero);
      var eh = /^(\d{12,13}|\d{15}|\d{20})$/.test(desformatado);

      return eh;
    };

    proc.formatar = function (numero) {
      var ehValido = proc.ehValido(numero);
      if (!ehValido) return numero;

      var ehAntigo = proc.ehAntigo(numero);
      var ehSimplificado = proc.ehSimplificado(numero);

      var desformatado = proc.desformatar(numero);

      if (ehAntigo) return proc.formatarPorTipo(desformatado, "antigo");
      if (ehSimplificado) return proc.formatarPorTipo(desformatado, "simplificado");

      return proc.formatarPorTipo(desformatado, "novo");
    };

    proc.formatarPorTipo = function (numero, tipo) {
      var regex;
      var mascara;

      switch (tipo) {
        case "antigo":
          regex = /^(\d{3,4})(\d{2})(\d{6})(\d{1})$/;
          mascara = "$1.$2.$3-$4";
          break;
        case "novo":
          regex = /^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/;
          mascara = "$1-$2.$3.$4.$5.$6";
          break;
        case "simplificado":
          regex = /^(\d{4})(\d{2})(\d{2})(\d{6})(\d)$/;
          mascara = "$1.$2.$3.$4-$5";
          break;
      }

      return numero.replace(regex, mascara);
    };
  }
})(window.angular);
