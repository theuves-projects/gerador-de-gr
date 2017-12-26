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

    hist.atualizarDados = function () {
      hist.dados = Configuracoes.obter("historico");
    }

    hist.editar = function (data) {
      $location.url("/editar/" + data);
    };

    hist.limpar = function () {
      var fazer = $window.confirm("Você perderá tudo!\n\nCerteza?");

      if (fazer) {
        Configuracoes.adicionar("historico", {});
        hist.atualizarDados();
      }
    };

    hist.remover = function (data) {
      var fazer = $window.confirm("Certeza?");

      if (fazer) {
        Historico.remover(data);
        hist.atualizarDados();
      }
    };

    hist.tahVazio = function () {
      return angular.equals(hist.dados, {});
    };

    hist.ver = function (data) {
      $location.url("/impressao/" + data);
    };
  }
})(window.angular);
