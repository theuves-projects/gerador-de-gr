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
      if (!Configuracoes.tem("destinatarios")) {
        Destinatarios.iniciar();
      }

      if (!Configuracoes.tem("usuario")) {
        var nome = $window.prompt("Informe seu nome:");

        nome = angular.uppercase(nome || "");

        Configuracoes.adicionar("usuario", nome);
      }
    }
})();
