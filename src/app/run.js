;(function (angular) {
  "use strict";

  angular
    .module("app")
    .run(run);

  function run(
      $window
    , Configuracoes
    , Destinatarios
    , Historico
    ) {

      // Configurar nome do usuário.
      if (!Configuracoes.tem("usuario")) {
        var respota = $window.prompt("Informe seu nome:");
        var nome = angular.uppercase(respota || "");

        Configuracoes.adicionar("usuario", nome);
      }

      // Configurar destinatários.
      if (!Configuracoes.tem("destinatarios")) {
        Destinatarios.iniciar();
      }

      // Configurar histórico.
      if (!Configuracoes.tem("histórico")) {
        Historico.iniciar();
      }
    }
})(window.angular);
