;(function () {
  "use strict";

  angular
    .module("app")
    .directive("checkBox", checkBox);

  function checkBox() {
    return {
      scope: {
        cbLigado: "=",
        cbMensagem: "@",
        cbCorDaBorda: "@",
        cbCorDoFundo: "@"
      },
      templateUrl: "app/directives/checkBox/template.html",
      link: link
    };

    function link(scope, element, attrs) {
      element.css({
        display: "block"
      });

      scope.cbClass = {
        "cb-desligado": !scope.cbLigado
      };

      scope.cbStyle = {
        "border-color": scope.cbCorDaBorda,
        "background-color": scope.cbCorDoFundo
      };
    }
  }
})();
