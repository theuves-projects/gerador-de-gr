;(function () {
  "use strict";

  angular
    .module("app")
    .service("Configuracoes", Configuracoes);

  function Configuracoes() {
    var conf = this;
    ////////////////

    conf.$PREFIXO = "g-";

    conf.$prefixar = function (item) {
      return conf.$PREFIXO + item;
    };

    conf.adicionar = function (item, valor) {
      var itemComPrefixo = conf.$prefixar(item);
      var valorEmJson = angular.toJson(valor);

      localStorage.setItem(itemComPrefixo, valorEmJson);
    };

    conf.obter = function (item) {
      var itemComPrefixo = conf.$prefixar(item);
      var valorEmJson = localStorage.getItem(itemComPrefixo);
      var valorCru = angular.fromJson(valorEmJson);

      return valorCru;
    };

    conf.remover = function (item) {
      var itemComPrefixo = conf.$prefixar(item);

      localStorage.removeItem(itemComPrefixo);
    };

    conf.tem = function (item) {
      var itemComPrefixo = conf.$prefixar(item);

      return itemComPrefixo in localStorage;
    }
  }
})();
