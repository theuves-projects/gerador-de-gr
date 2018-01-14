;(function (angular) {
  "use strict";

  angular
    .module("app")
    .component("grApp", config());

  function config() {
    return {
      templateUrl: "app/components/grApp/template.html"
    };
  }
})(window.angular);
