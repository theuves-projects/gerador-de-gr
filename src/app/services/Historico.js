;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Historico", Historico);

  function Historico(Configuracoes) {
    var hist = this;
    ////////////////

    hist._iniciar = function () {
      Configuracoes.adicionar(hist.nome, {});
    };

    hist.nome = "historico";

    hist.adicionar = function (
      data,
      numero,
      malote,
      destinatario,
      processos,
      tahEditando
    ) {
      var dados = Configuracoes.obter(hist.nome);

      dados[data] = {
        numero: numero,
        malote: malote,
        destinatario: destinatario,
        processos: processos,
        tahEditando: tahEditando
      };

      Configuracoes.adicionar(hist.nome, dados);
    };

    hist.obter = function (data) {
      var dados = Configuracoes.obter(hist.nome);

      return dados[data];
    };

    hist.remover = function (data) {
      var dados = Configuracoes.obter(hist.nome);

      delete dados[data];

      Configuracoes.adicionar(hist.nome, dados);
    };
  }
})(window.angular);
