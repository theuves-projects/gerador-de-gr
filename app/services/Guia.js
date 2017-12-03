;(function () {
  "use strict";

  angular
    .module("app")
    .service("Guia", Guia);

  function Guia() {
    this.definir = adicionar;
    this.obter = obter;

    ///

    var dados = {};

    function adicionar(
        numero
      , destinatario
      , malote
      , processos
      , vaiMalote
    ) {
      dados = {
          numero: numero
        , destinatario: destinatario
        , malote: malote
        , processos: processos
        , vaiMalote: vaiMalote
      };
    }

    function obter() {
      return dados;
    }
  }
})();
