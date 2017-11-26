;(function () {
  "use strict";

  (angular)
  .module("indice.directives", [])
  .directive("autofocus", autofocus);

  /**
   * no firefox, por um motivo que eu
   * desconheço, não tava focando o <input>
   * automaticamente ao iniciar a página
   */
  function autofocus() {
    return {
        restrict: "A"
      , link: link
    };

    function link(_, element) {
      element[0].focus();
    }
  }
})();
