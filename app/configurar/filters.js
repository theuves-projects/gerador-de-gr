;(function () {
  "use strict";

  angular
    .module("configurar.filters", [])
    .filter("ehPraDourados", ehPraDourados)
  ;

  /**
   * verificar se a carga é pra Dourados
   */
  function ehPraDourados(Guia) {
    return function ehPraDourados(destinatario) {
      return Guia.ehPraDourados(destinatario);
    }
  }
})();
