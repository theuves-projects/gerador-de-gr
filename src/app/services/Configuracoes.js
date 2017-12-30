;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Configuracoes", Configuracoes);

  function Configuracoes($window) {
    var conf = this;
    ////////////////

    conf._PREFIXO = "g-";

    conf._prefixar = function (item) {
      return conf._PREFIXO + item;
    };

    conf.adicionar = function (item, valor) {
      var itemComPrefixo = conf._prefixar(item);
      var valorEmJson = angular.toJson(valor);

      $window.localStorage.setItem(itemComPrefixo, valorEmJson);
    };

    conf.obter = function (item) {
      var itemComPrefixo = conf._prefixar(item);
      var valorEmJson = $window.localStorage.getItem(itemComPrefixo);
      var valorCru = angular.fromJson(valorEmJson);

      return valorCru;
    };

    conf.remover = function (item) {
      var itemComPrefixo = conf._prefixar(item);

      $window.localStorage.removeItem(itemComPrefixo);
    };

    conf.tem = function (item) {
      var itemComPrefixo = conf._prefixar(item);

      return itemComPrefixo in $window.localStorage;
    };
  }
})(window.angular);
