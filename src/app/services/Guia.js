;(function () {
  "use strict";

  angular
    .module("app")
    .service("Guia", Guia);

  function Guia() {
    var guia = this;
    ////////////////

    guia.dados = {};

    guia.definir = function (dados) {
      angular.extend(guia.dados, dados);
    };

    guia.obter = function () {
      return guia.dados;
    };

    guia.tahVazia = function () {
      return angular.equals(guia.dados, {});
    };
  }
})();
