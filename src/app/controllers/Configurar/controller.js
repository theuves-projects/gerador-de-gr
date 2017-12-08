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
  ) {
    var conf = this;
    ////////////////

    conf.destinatarios = Destinatarios.obter();
    conf.nomeDoUsuario = Configuracoes.NomeDoUsuario.obter();

    conf.adicionarDestinatario = function(novoDestinatario) {
      conf.destinatarios.push(novoDestinatario);

      conf.novoDestinatario = "";
    };

    conf.removerDestinatario = function(indice) {
      delete conf.destinatarios[indice];

      conf.destinatarios = conf.destinatarios.filter(function (item) {
        return item;
      });
    };

    conf.salvarDestinatarios = function(novosDestinatarios) {
      Destinatarios.salvar(novosDestinatarios);

      alert("Salvo!");
    };

    conf.salvarNovoNomeDoUsuario = function(nome) {
      Configuracoes.NomeDoUsuario.definir(nome);

      alert("Salvo!");

      $window.location.reload();
    };

    conf.voltarPraPaginaInicial = function() {
      $location.path("/");
    };
  }
})();
