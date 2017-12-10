;(function () {
  "use strict";

  angular
    .module("app")
    .directive("codigoDeBarras", codigoDeBarras);

  function codigoDeBarras() {
    return {
      scope: {
        guia: "="
      },
      templateUrl: "app/directives/codigoDeBarras/template.html",
      link: link
    };

    function link(scope, element, attrs) {
      var elemento = element.find("img")[0];
      var guia = scope.guia;

      JsBarcode(elemento, guia, {
          height: 5
        , margin: 0
        , displayValue: false
      });
    }
  }
})();
