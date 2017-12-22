;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Historico", Historico);

  function Historico() {
    var hist = this;
    ////////////////

    hist.adicionar = function (
      data,
      numero,
      malote,
      destinatario,
      processos
    ) {

    };

    hist.obter = function (data) {

    };

    hist.remover = function (data) {

    };
  }
})(window.angular);
