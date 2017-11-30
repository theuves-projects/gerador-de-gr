;(function () {
  "use strict";

  (angular)
  .module("app.services")
  .service("Guia", Guia);

  function Guia() {
    var dados = {};

    // definir os dados da guia
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

    this.definir = adicionar;
    this.obter = obter;
  }
})();
