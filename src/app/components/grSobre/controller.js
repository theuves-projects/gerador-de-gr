;(function (angular) {
  "use strict";

  angular
    .module("app")
    .component("grSobre", config());

  function config() {
    return {
      controller: Sobre,
      templateUrl: "app/components/grSobre/template.html"
    };
  }

  function Sobre($window) {
    var sobr = this;
    ////////////////

    sobr.verCodigoFonte = function () {
      $window.location.href = "https://goo.gl/RKLC52";
    }
  }
})(window.angular);
