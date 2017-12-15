;(function () {
  "use strict";

  angular
    .module("app")
    .run(run);

  function run(
      $window
    , Configuracoes
    , Destinatarios
    , Guia
    ) {
      if (Configuracoes.naoTem("listaDeDestinatarios")) {
        Destinatarios.iniciar();
      }

      if (Configuracoes.naoTem("nomeDoUsuario")) {
        var nome = $window.prompt("Informe seu nome:");

        nome = angular.uppercase(nome || "");

        Configuracoes.adicionar("nomeDoUsuario", nome);
      }
    }
})();
