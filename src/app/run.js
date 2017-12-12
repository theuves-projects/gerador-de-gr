;(function () {
  "use strict";

  angular
    .module("app")
    .run(run);

  function run(
      $window
    , $anchorScroll
    , $location
    , Configuracoes
    , Destinatarios
    , Tela
    ) {

      // O scroll funcionará somente na
      // página de configurações.
      if ($location.path() === "/configurar") {
        $anchorScroll.yOffset = 5;

        $anchorScroll();
      }

      if (Configuracoes.naoTem("listaDeDestinatarios")) {
        Destinatarios.iniciar();
      }

      if (Configuracoes.naoTem("nomeDoUsuario")) {
        var nome = Tela.perguntar("Atenção", "Informe seu nome:");

        // (Caso o usuário tenha cancelado,
        // pois isso retornaria `null`)
        // +-----------------------------vv
        nome = angular.uppercase(nome || "");

        Configuracoes.adicionar("nomeDoUsuario", nome);
      }
    }
})();
