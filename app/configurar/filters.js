;(function () {
  "use strict";

  angular
    .module("configurar.filters", [])
    .filter("naoTemMalote", naoTemMalote)
  ;

  /**
   * verificar pelo destinatário se
   * vai ser usado o serviço de malote
   */
  function naoTemMalote(Guia) {
    return function (destinatario) {
      return Guia.naoTemMalote(destinatario);
    }
  }
})();
