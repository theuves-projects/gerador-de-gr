;(function () {
  "use strict";

  angular
    .module("app.services", [])

    /**
     * services
     */
    .service("Guia", Guia)
  ;

  /**
   * vai armazenar os dados que serão
   * usados na guia que está sendo gerada
   */
  function Guia() {
    var dados = {};

    this.definir = adicionar;
    this.obter = obter;
    this.ehPraDourados = ehPraDourados;

    /**
     * definir os dados da guia
     */
    function adicionar(
        carga
      , destinatario
      , lacre
      , malote
      , processos
    ) {
      dados = {
          carga       : carga
        , destinatario: destinatario
        , lacre       : lacre
        , malote      : malote
        , processos   : processos
      };
    }

    /**
     * obter os dados da guia
     */
    function obter() {
      return dados;
    }

    /**
     * verificar se o destinatário é de Dourados
     */
    function ehPraDourados(destinatario) {
      var eh = false;

      if (
           /\bdourados\b/i.test(destinatario)
        && !/\bglória\b/i.test(destinatario)
      ) {
        eh = true;
      }

      return eh;
    }
  }
})();
