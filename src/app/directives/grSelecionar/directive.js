;(function (angular) {
  "use strict";

  angular
    .module("app")
    .directive("grSelecionar", grSelecionar);

  function grSelecionar($window) {
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
})(window.angular);
