;(function () {
  "use strict";

  angular
    .module("app")
    .service("Armazenamento", Armazenamento);

  function Armazenamento() {
    var arm = this;
    ///////////////

    arm.adicionar = function (item, valor) {
      valor = angular.toJson(valor);

      return localStorage.setItem(item, valor);
    };

    arm.remover = function (item) {
      return localStorage.removeItem(item);
    };

    arm.obter = function (item) {
      var valor;

      valor = localStorage.getItem(item);
      valor = angular.fromJson(valor);

      return valor;
    };
  }
})();
