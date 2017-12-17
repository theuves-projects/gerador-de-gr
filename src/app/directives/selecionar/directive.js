;(function () {
  "use strict";

  angular
    .module("app")
    .directive("selecionar", selecionar);

  function selecionar($timeout) {
    return {
      link: link,
      restrict: "A"
    };

    function link(scope, element) {
      element.on("click", function (event) {
        select(event.srcElement);
      });
    }
  }
})();
