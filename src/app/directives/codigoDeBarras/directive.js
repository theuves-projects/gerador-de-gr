;(function (angular) {
  "use strict";

  angular
    .module("app")
    .directive("codigoDeBarras", codigoDeBarras);

  function codigoDeBarras($window) {
    return {
      link: link,
      scope: {
        cdbGuia: "=",
        cdbTamanho: "="
      },
      templateUrl: "app/directives/codigoDeBarras/template.html"
    };

    function link(scope, element) {
      element.css({
        display: "block"
      });

      var img = element.find("img")[0];
      var val = scope.cdbGuia;
      var opts = {
        height: scope.cdbTamanho,
        margin: 0,
        displayValue: false
      };

      $window.JsBarcode(img, val, opts);
    }
  }
})(this.angular);
