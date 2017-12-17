;(function (angular) {
  "use strict";

  angular
    .module("app")
    .directive("focar", focar);

  /**
   * no firefox, por um motivo que eu
   * desconheço, não tava focando o <input>
   * automaticamente ao iniciar a página
   */
  function focar() {
    return {
      link: link,
      restrict: "A"
    };

    function link(scope, element) {
      element.ready(function () {
        element[0].focus();
      });
    }
  }
})(this.angular);
