;(function () {
  "use strict";

  angular
    .module("app")
    .directive("codigoDeBarras", codigoDeBarras);

  function codigoDeBarras() {
    return {
      templateUrl: "app/directives/codigoDeBarras/template.html",
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
