;(function (angular) {
  "use strict";

  angular
    .module("app")
    .filter("destacar", destacar);

  function destacar() {
    return function (processo) {
      return processo.replace(/([^0]+\d-\d{2})/, function (numero) {
        return numero.bold();
      });
    };
  }
})(window.angular);
