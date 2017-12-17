;(function () {
  "use strict";

  angular
    .module("app")
    .directive("selecionar", selecionar);

  function selecionar($window) {
    return {
      link: link,
      restrict: "A"
    };

    function link(scope, element) {
      element.on("click", function (event) {
        $window.select(event.srcElement);
      });
    }
  }
})();
