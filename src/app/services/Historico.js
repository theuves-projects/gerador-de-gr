;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Historico", Historico);

  function Historico(Configuracoes) {
    var hist = this;
    ////////////////

    hist._iniciar = function () {
      Configuracoes.adicionar(hist._nome, {});
    };

    hist._nome = "historico";

    hist.adicionar = function (
        data
      , numero
      , malote
      , destinatario
      , processos
      , tahEditando
    ) {
      var dados = Configuracoes.obter(hist._nome);

      dados[data] = {
        numero: numero,
        malote: malote,
        destinatario: destinatario,
        processos: processos,
        tahEditando: tahEditando
      };

      Configuracoes.adicionar(hist._nome, dados);
    };

    hist.obter = function (data) {
      var dados = Configuracoes.obter(hist._nome);

      return dados[data];
    };

    hist.remover = function (data) {
      var dados = Configuracoes.obter(hist._nome);

      delete dados[data];

      Configuracoes.adicionar(hist._nome, dados);
    };
  }
})(window.angular);
