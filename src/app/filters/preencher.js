;(function () {
  "use strict";

  angular
    .module("app")
    .filter("preencher", preencher);

  function preencher() {
    return function (numero, comprimento) {
      numero = numero.toString();
      comprimento = comprimento.toString().length;

      return numero.padStart(comprimento, "0");
    }
  }
})();
