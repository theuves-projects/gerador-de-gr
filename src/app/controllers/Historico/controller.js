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

    hist.atualizarDados = function () {
      var emObjeto = function (item) {
        var data = item[0];
        var dados = item[1];

        var base = {data: data};
        var objeto = Object.assign(base, dados);

        return objeto;
      };

      var dadosEmObj = Configuracoes.obter("historico");
      var dadosEmArray = Object
        .entries(dadosEmObj)
        .map(emObjeto);

      hist.dados = dadosEmArray;
    };

    hist.editar = function (data) {
      $location.url("/editar/" + data);
    };

    hist.iniciar = function () {
      hist.atualizarDados();
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
      return angular.equals(hist.dados, []);
    };

    hist.ver = function (data) {
      $location.url("/impressao/" + data);
    };
  }
})(window.angular);
