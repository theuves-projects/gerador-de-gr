;(function (angular) {
  "use strict";

  angular
    .module("app")
    .controller("Configuracoes", Configuracoes);

  function Configuracoes(
      $window
    , $location
    , $anchorScroll
    , Configuracoes
    , Destinatarios
  ) {
    var conf = this;
    ////////////////

    conf.usuario = {
      nome: Configuracoes.obter("usuario"),
      salvar: function () {
        var nomeEmMaiusculo = this.nome.toUpperCase();

        Configuracoes.adicionar("usuario", nomeEmMaiusculo);
      }
    };

    conf.destinatarios = {
      novo: "",
      lista: Destinatarios.obter(),
      adicionar: function ()  {
        if (angular.equals(this.novo.trim(), "")) {
          $window.alert("Informe algo!");
          return;
        }

        var destEmMaiusculo = this.novo.toUpperCase();

        if (this.tem(destEmMaiusculo)) {
          $window.alert("O destinatário informado já existe!");
          return;
        }

        this.lista.push(destEmMaiusculo);
        this.limpar();
        return;
      },
      limpar: function () {
        this.novo = "";
      },
      remover: function (indice) {
        if ($window.confirm("Tem certeza?")) {
          delete this.lista[indice];

          this.lista = this.lista.filter(function (item) {
            return item;
          });
        }
      },
      salvar: function () {
        Destinatarios.adicionar(this.lista);
      },
      tahSalvo: function (destinatario) {
        return Destinatarios.obter().includes(destinatario);
      },
      tem: function (destinatario) {
        return this.lista.includes(destinatario);
      }
    };

    conf.iniciar = function () {
      configurarScroll();

      // configuracoes

      function configurarScroll() {
        $anchorScroll.yOffset = 10;
        $anchorScroll();
      }
    };

    conf.podeSair = function () {
      var originalUsuario = Configuracoes.obter("usuario");
      var originalDestinatarios = Destinatarios.obter();
      var confUsuario = conf.usuario.nome;
      var confDestinatarios = conf.destinatarios.lista;

      var nMudouUsuario = angular.equals(originalUsuario, confUsuario);
      var nMudouDestinatarios = angular.equals(originalDestinatarios, confDestinatarios);

      return nMudouUsuario && nMudouDestinatarios;
    };

    conf.salvar = function () {
      conf.usuario.salvar();
      conf.destinatarios.salvar();

      $window.alert("Salvo!");
      $window.location.reload();
    };
  }
})(window.angular);
