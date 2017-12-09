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

        // Caso o usuário tenha cancelado,
        // pois isso retornaria 'null'.
        nome = nome || "";

        Configuracoes.adicionar("nomeDoUsuario", nome);
      }
    }
})();
