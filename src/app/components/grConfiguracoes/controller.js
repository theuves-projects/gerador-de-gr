;(function (angular) {
  "use strict";

  angular
    .module("app")
    .component("grConfiguracoes", config());

  function config() {
    return {
      controller: Configuracoes,
      templateUrl: "app/components/grConfiguracoes/template.html"
    };
  }

  function Configuracoes(
    $window,
    $location,
    $anchorScroll,
    Configuracoes,
    Destinatarios
  ) {
    var conf = this;
    ////////////////

    conf._iniciar = function () {
      $anchorScroll.yOffset = 10;
      $anchorScroll();
    };

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
        var destAparado = this.novo.trim();
        var destEmMaiusculo = destAparado.toUpperCase();
        var temDest = this.tem(destEmMaiusculo);
        var tahVazio = !destEmMaiusculo;

        if (tahVazio) return $window.alert("Informe algo!");
        if (temDest) return $window.alert("O destinatário informado já existe!");

        this.lista.push(destEmMaiusculo);
        this.limpar();

        return;
      },
      limpar: function () {
        this.novo = "";
      },
      remover: function (indice) {
        var temCerteza = $window.confirm("Tem certeza?");

        if (temCerteza) {
          delete this.lista[indice];
          this.lista = this.lista.filter(Boolean);
        }
      },
      salvar: function () {
        Destinatarios.adicionar(this.lista);
      },
      tahSalvo: function (destinatario) {
        var destinatarios = Destinatarios.obter();
        if (destinatarios === null) return false;
        return destinatarios.includes(destinatario);
      },
      tem: function (destinatario) {
        return this.lista.includes(destinatario);
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
