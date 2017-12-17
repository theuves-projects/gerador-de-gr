;(function () {
  "use strict";

  angular
    .module("app")
    .run(run);

  function run(
      $window
    , Configuracoes
    , Destinatarios
    ) {

      // Configurar destinatários.
      if (!Configuracoes.tem("destinatarios")) {
        Destinatarios.iniciar();
      }

      // Configurar nome do usuário.
      if (!Configuracoes.tem("usuario")) {
        var respota = $window.prompt("Informe seu nome:");
        var nome = angular.uppercase(respota || "");

        Configuracoes.adicionar("usuario", nome);
      }
    }
})();
