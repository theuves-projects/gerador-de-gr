;(function () {
  "use strict";

  (angular)
  .module("imprimir")
  .directive("codigoDeBarras", codigoDeBarras);

  function codigoDeBarras() {
    return {
      template: "<div><img></div>",
      link: link
    };

    /**
     * link
     */
    function link(_, element, attrs) {
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
