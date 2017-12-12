;(function () {
  "use strict";

  angular
    .module("app")
    .run(run);

  function run(
      $window
    , Configuracoes
    , Destinatarios
    , Tela
    ) {
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
