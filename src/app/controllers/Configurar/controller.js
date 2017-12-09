;(function () {
  "use strict";

  angular
    .module("app")
    .controller("Configurar", Configurar);

  /**
   * vai fazer as configurações da aplicação
   *
   * vai configurar:
   * - nome do usuário
   * - novos destinatários
   * - malote do destinatário
   */
  function Configurar(
      $window
    , $location
    , Configuracoes
    , Destinatarios
    , Tela
  ) {
    var conf = this;
    ////////////////

    conf.listaDeDestinatarios = Destinatarios.obter();

    conf.nomeDoUsuario = Configuracoes.obter("nomeDoUsuario");

    conf.adicionarDestinatario = function(novoDestinatario) {
      if (angular.equals(novoDestinatario.trim(), "")) {
        Tela.alertar("Erro", "Informe algo!");

        return;
      }

      if (Destinatarios.tem(novoDestinatario)) {
        Tela.alertar("Erro", "O destinatário informado já existe!");

        return;
      }

      conf.listaDeDestinatarios.push(novoDestinatario);

      conf.novoDestinatario = "";
    };

    conf.removerDestinatario = function(indice) {
      delete conf.listaDeDestinatarios[indice];

      conf.listaDeDestinatarios = conf.listaDeDestinatarios.filter(function (item) {
        return item;
      });
    };

    conf.salvarDestinatarios = function(novosDestinatarios) {
      Destinatarios.salvar(novosDestinatarios);

      alert("Salvo!");

      $window.location.reload();
    };

    conf.salvarNovoNomeDoUsuario = function(nome) {
      Configuracoes.adicionar("nomeDoUsuario", nome);

      alert("Salvo!");

      $window.location.reload();
    };

    conf.voltarPraPaginaInicial = function() {
      $location.path("/");
    };
  }
})();
