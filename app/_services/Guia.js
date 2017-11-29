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

      //////////////////
      , listaDeProcessos
    ) {
      dados = {
          guia: guia
        , destinatario: destinatario
        , malote: malote
        , processos: processos

        ////////////////////////////////////
        , listaDeProcessos: listaDeProcessos
      };
    }

    function obter() {
      return dados;
    }

    /**
     * verificar se o destinatário não usa malote
     *
     * não usam malotes as cidades de:
     * - batayporã
     * - dourados
     * - glória de dourados
     */
    function naoTemMalote(destinatario) {
      var cidades = /(batayporã|(glória\sde\s)?dourados)/i.test(destinatario);

      function ehTrabalhista(dest)  {
        return /do\strabalho/i
          .test(dest)
        ;
      }

      return cidades && !ehTrabalhista(destinatario);
    }

    this.definir = adicionar;
    this.obter = obter;
    this.naoTemMalote = naoTemMalote;
  }
})();
