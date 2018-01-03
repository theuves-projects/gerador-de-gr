;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Historico", Historico);

  function Historico(Configuracoes) {
    var hist = this;
    ////////////////

    hist._iniciar = function () {
      hist.definir({});
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
      var dados = hist.obterTudo();

      dados[data] = {
        numero: numero,
        malote: malote,
        destinatario: destinatario,
        processos: processos,
        tahEditando: tahEditando
      };

      hist.definir(dados);
    };

    hist.definir = function(valor) {
      Configuracoes.adicionar(hist.nome, valor);
    }

    hist.obter = function (data) {
      var dados = hist.obterTudo();
      return dados[data];
    };

    hist.obterTudo = function () {
      var dados = Configuracoes.obter(hist.nome);
      return dados;
    }

    hist.remover = function (data) {
      var dados = hist.obterTudo();

      delete dados[data];

      hist.definir(dados);
    };
  }
})(window.angular);
