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

    hist.acao = function (data) {
      return {
        ver: function () {
          $location.url("/impressao/" + data);
        },
        editar: function () {
          $location.url("/editar/" + data);
        },
        remover: function () {
          var temCerteza = $window.confirm("Certeza?");

          if (temCerteza) {
            Historico.remover(data);
            hist.atualizarDados();
          }
        }
      };
    };

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

    hist.iniciar = function () {
      hist.atualizarDados();
    };

    hist.limpar = function () {
      var temCerteza = $window.confirm("Você perderá tudo!\n\nCerteza?");

      if (temCerteza) {
        Configuracoes.adicionar("historico", {});
        hist.atualizarDados();
      }
    };

    hist.tahVazio = function () {
      return angular.equals(hist.dados, []);
    };
  }
})(window.angular);
