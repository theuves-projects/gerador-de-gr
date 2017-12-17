;(function () {
  "use strict";

  angular
    .module("app")
    .directive("checkBox", checkBox);

  function checkBox() {
    return {
      link: link,
      scope: {
        cbCorDaBorda: "@",
        cbCorDoFundo: "@",
        cbLigado: "=",
        cbMensagem: "@"
      },
      templateUrl: "app/directives/checkBox/template.html"
    };

    function link(scope, element, attrs) {
      element.css({
        display: "block"
      });
    }
  }
})();
