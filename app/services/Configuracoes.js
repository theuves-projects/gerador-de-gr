;(function () {
  "use strict";

  angular
    .module("app")
    .service("Configuracoes", Configuracoes);

  function Configuracoes() {

    // (gerenciar o armazenamento das configurações)
    var Config = {
      definir: function (item) {
        var itemEmJson = angular.toJson(item);

        return localStorage.setItem("configuracoes", itemEmJson);
      },
      obter: function (item) {
        var dados = angular.fromJson(localStorage.getItem("configuracoes"));

        if (item) return dados[item];
        return dados;
      },
      tem: function (item)  {
        return Boolean(this.obter(item));
      },
      naoTem: function (item) {
        return !this.tem(item);
      }
    };

    // iniciar configuração (caso seja o primeiro acesso)
    if (Config.obter() === null) Config.definir({});

    if (Config.naoTem("nomeDoUsuario")) {
      var nomeDoUsuario = prompt("[Configurações]\n\n"
        + "Insira seu nome, por favor:");

      var nomeDoUsuarioEhValido = nomeDoUsuario && nomeDoUsuario.trim();

      if (nomeDoUsuarioEhValido) {
        Config.definir({
          nomeDoUsuario: nomeDoUsuario
        });
      } else {
        alert("Nome inválido!");
      }
    }

    ///

    var NomeDoUsuario = {
      obter: function () {
        return Config.obter().nomeDoUsuario;
      },
      definir: function (nome) {
        var novasConfiguracoes = Config.obter();

        novasConfiguracoes.nomeDoUsuario = nome;

        Config.definir(novasConfiguracoes);
      }
    };

    this.NomeDoUsuario = NomeDoUsuario;
  }
})();
