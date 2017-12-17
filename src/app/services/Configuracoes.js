;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Configuracoes", Configuracoes);

  function Configuracoes($window) {
    var conf = this;
    ////////////////

    conf.$PREFIXO = "g-";

    conf.$prefixar = function $prefixar(item) {
      return conf.$PREFIXO + item;
    };

    conf.adicionar = function adicionar(item, valor) {
      var itemComPrefixo = conf.$prefixar(item);
      var valorEmJson = angular.toJson(valor);

      $window.localStorage.setItem(itemComPrefixo, valorEmJson);
    };

    conf.obter = function obter(item) {
      var itemComPrefixo = conf.$prefixar(item);
      var valorEmJson = $window.localStorage.getItem(itemComPrefixo);
      var valorCru = angular.fromJson(valorEmJson);

      return valorCru;
    };

    conf.remover = function remover(item) {
      var itemComPrefixo = conf.$prefixar(item);

      $window.localStorage.removeItem(itemComPrefixo);
    };

    conf.tem = function tem(item) {
      var itemComPrefixo = conf.$prefixar(item);

      return itemComPrefixo in $window.localStorage;
    };
  }
})(this.angular);
