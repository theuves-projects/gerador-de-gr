;(function () {
  "use strict";

  angular
    .module("app")
    .service("Guia", Guia);

  function Guia() {
    var guia = this;
    ////////////////

    guia.dados = {};

    guia.definir = function (
        numero
      , destinatario
      , malote
      , processos
      , vaiMalote
    ) {
      guia.dados = {
          numero: numero
        , destinatario: destinatario
        , malote: malote
        , processos: processos
        , vaiMalote: vaiMalote
      };
    };

    guia.obter = function () {
      return guia.dados;
    };
  }
})();
