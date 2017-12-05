;(function () {
  "use strict";

  angular
    .module("app")
    .service("Guia", Guia);

  function Guia() {
    this.dados = {};

    this.adicionar = function (
        numero
      , destinatario
      , malote
      , processos
      , vaiMalote
    ) {
      this.dados = {
          numero: numero
        , destinatario: destinatario
        , malote: malote
        , processos: processos
        , vaiMalote: vaiMalote
      };
    };

    this.obter = function () {
      return this.dados;
    };
  }
})();
