;(function () {
  "use strict";

  angular
    .module("imprimir.directives", [])
    .directive("codigoDeBarras", codigoDeBarras)
  ;

  function codigoDeBarras() {
    return {
        template: "<img>"
      , link: link
    };

    /**
     * link
     */
    function link(
         _
      , element
      , attrs
    ) {
      var elemento = element.find("img")[0];
      var guia = attrs.guia;

      JsBarcode(elemento, guia, {
          height: 5
        , margin: 0
        , displayValue: false
      });
    }
  }
})();
