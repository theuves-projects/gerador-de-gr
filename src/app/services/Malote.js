;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Malote", Malote);

  function Malote() {
    var mal = this;
    ///////////////

    mal.numero = function numero(codigoDeBarras) {
      return codigoDeBarras.replace(/^.*(\d{5})$/, "$1");
    };
  }
})(this.angular);
