;(function () {
  "use strict";

  angular
    .module("app.services", [])
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
  }
})();
