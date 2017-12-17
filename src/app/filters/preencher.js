;(function (angular) {
  "use strict";

  angular
    .module("app")
    .filter("preencher", preencher);

  function preencher() {
    return function (num, pad) {
      return num
        .toString()
        .padStart(pad, "0");
    };
  }
})(this.angular);
