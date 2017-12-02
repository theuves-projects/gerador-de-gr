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
        guia
      , destinatario
      , malote
      , processos
      , vaiMalote

      //////////////////
      , listaDeProcessos
    ) {
      dados = {
          guia: guia
        , destinatario: destinatario
        , malote: malote
        , processos: processos
        , vaiMalote: vaiMalote

        ////////////////////////////////////
        , listaDeProcessos: listaDeProcessos
      };
    }

    function obter() {
      return dados;
    }
  }
})();
