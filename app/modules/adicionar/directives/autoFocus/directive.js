;(function () {
  "use strict";

  angular
    .module("adicionar")
    .directive("autoFocus", autoFocus);

  /**
   * no firefox, por um motivo que eu
   * desconheço, não tava focando o <input>
   * automaticamente ao iniciar a página
   */
  function autoFocus() {
    return {
      restrict: "A",
      link: link
    };

    function link(scope, element) {
      element.ready(function () {
        element[0].focus();
      });
    }
  }
})();
