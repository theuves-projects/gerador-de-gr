;(function () {
  "use strict";

  angular
    .module("adicionar")
    .directive("checkBox", checkBox);

  function checkBox() {
    return {
      scope: {
        ligado: "=",
        mensagem: "@"
      },
      templateUrl: "app/directives/checkBox/template.html"
    };
  }
})();
