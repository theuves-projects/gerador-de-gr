;(function () {
  "use strict";

  angular
    .module("adicionar")
    .directive("selecionar", selecionar);

  function selecionar($timeout) {
    return {
      restrict: "A",
      link: link
    };

    function link(scope, element) {
      element.on("click", function (event) {
        select(event.srcElement);
      });
    }
  }
})();
