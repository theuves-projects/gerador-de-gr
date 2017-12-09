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

    conf.usuario = {
      nome: Configuracoes.obter("nomeDoUsuario"),
      salvar: function () {
        Configuracoes.adicionar("nomeDoUsuario", this.nome);

        alert("Salvo!");

        $window.location.reload();
      },
    };

    conf.destinatarios = {
      novo: "",
      lista: Destinatarios.obter(),
      adicionar: function ()  {
        if (angular.equals(this.novo.trim(), "")) {
          Tela.alertar("Erro", "Informe algo!");
          return;
        }

        if (Destinatarios.tem(this.novo)) {
          Tela.alertar("Erro", "O destinatário informado já existe!");
          return;
        }

        this.lista.push(this.novo);
        this.novo = "";
      },
      remover: function (indice) {
        delete this.lista[indice];

        this.lista = this.lista.filter(function (item) {
          return item;
        });
      },
      salvar: function () {
        Destinatarios.salvar(this.lista);

        alert("Salvo!");

        $window.location.reload();
      }
    };

    conf.voltarPraPaginaInicial = function() {
      $location.path("/");
    };
  }
})();
