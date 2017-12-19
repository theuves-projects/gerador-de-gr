;(function () {
  "use strict";

  angular
    .module("app")
    .directive("grCabecalho", grCabecalho);

  function grCabecalho() {
    return {
      scope: {
        cabTitulo: "@"
      },
      link: link,
      templateUrl: "app/directives/grCabecalho/template.html"
    };

    function link(scope) {
      scope.cabData = Date.now();
    }
  }
})(this.angular);
