;(function () {
  "use strict";

  angular
    .module("adicionar")
    .directive("checkBox", checkBox);

  function checkBox() {
    return {
      templateUrl: "app/modules/adicionar/directives/checkBox/directive.html"
    };
  }
})();
