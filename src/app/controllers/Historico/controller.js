;(function (angular) {
  "use strict";

  angular
    .module("app")
    .controller("Historico", Historico);

  function Historico(
      $location
    , $window
    , Configuracoes
    , Historico
  ) {
    var hist = this;
    ////////////////

    hist.dados = Configuracoes.obter("historico");

    hist.editar = function (data) {};

    hist.remover = function (data) {
      var fazer = $window.confirm("Certeza?");
      if (fazer) Historico.remover(data);
      hist.dados = Configuracoes.obter("historico");
    };

    hist.tahVazio = function () {
      return angular.equals(hist.dados, {});
    };

    hist.ver = function (data) {
      $location.url("/impressao/" + data);
    };

    hist.voltar = function () {
      $location.url("/");
    };
  }
})(window.angular);
