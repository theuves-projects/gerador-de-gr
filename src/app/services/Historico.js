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

    hist.NOME = "historico";

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
      Configuracoes.adicionar(hist.NOME, valor);
    }

    hist.obter = function (data) {
      var dados = hist.obterTudo();
      var dadosDaData = dados[data];

      return dadosDaData;
    };

    hist.obterTudo = function () {
      var dados = Configuracoes.obter(hist.NOME);

      return dados;
    }

    hist.remover = function (data) {
      var dados = hist.obterTudo();
      var indice = dados.indexOf(data);

      dados.splice(indice, 1);

      hist.definir(dados);
    };
  }
})(window.angular);
