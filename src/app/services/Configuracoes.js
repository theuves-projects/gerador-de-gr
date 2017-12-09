;(function () {
  "use strict";

  angular
    .module("app")
    .service("Configuracoes", Configuracoes);

  function Configuracoes() {
    var conf = this;
    ////////////////

    conf.adicionar = function (item, valor) {
      var valorEmJson = angular.toJson(valor);

      return localStorage.setItem(item, valorEmJson);
    };

    conf.naoTem = function (item) {
      return !conf.tem(item);
    }

    conf.obter = function (item) {
      var valorEmJson = localStorage.getItem(item);
      var valor = angular.fromJson(valorEmJson);

      return valor;
    };

    conf.remover = function (item) {
      return localStorage.removeItem(item);
    };

    conf.tem = function (item) {
      var valorEmJson = localStorage.getItem(item);

      return valorEmJson !== null;
    }
  }
})();
