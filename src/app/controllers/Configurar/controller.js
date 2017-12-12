;(function () {
  "use strict";

  angular
    .module("app")
    .controller("Configurar", Configurar);

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
        Configuracoes.adicionar("nomeDoUsuario", angular.uppercase(this.nome));

        alert("Salvo!");

        $window.location.reload();
      }
    };

    conf.destinatarios = {
      novo: "",
      lista: Destinatarios.obter(),
      adicionar: function (evento)  {
        if (evento.key !== "Enter") return;

        if (angular.equals(this.novo.trim(), "")) {
          Tela.alertar("Erro", "Informe algo!");

          return;
        }

        if (this.tem(this.novo)) {
          Tela.alertar("Erro", "O destinatário informado já existe!");

          return;
        }

        this.lista.push(angular.uppercase(this.novo));
        this.novo = "";
      },
      remover: function (indice) {
        if (Tela.confirmar("Atenção", "Tem certeza?")) {
          delete this.lista[indice];

          this.lista = this.lista.filter(function (item) {
            return item;
          });
        }
      },
      salvar: function () {
        Destinatarios.salvar(this.lista);

        alert("Salvo!");

        $window.location.reload();
      },
      tem: function (destinatario) {
        return this.lista.includes(angular.uppercase(destinatario));
      }
    };

    conf.voltar = function() {
      $location.path("/");
    };
  }
})();
