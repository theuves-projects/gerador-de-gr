;(function (angular) {
  "use strict";

  angular
    .module("app")
    .filter("formatar", formatar);

  function formatar(Processo) {
    return function (num) {
      return Processo.formatar(num);
    };
  }
})(window.angular);
