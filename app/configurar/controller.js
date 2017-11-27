;(function () {
  "use strict";

  (angular)
  .module("configurar.controller", [])
  .controller("Configurar", Configurar);

  /**
   * vai fazer as configurações da aplicação
   *
   * vai configurar:
   * - nome do usuário
   * - novos destinatários
   * - malote do destinatário
   */
  function Configurar(
      $window

      // personalizados
    , Configuracoes
    , Destinatarios
  ) {
    var vm = this;
    //////////////

    /**
     * funções
     * -------
     */
    var salvarNovoNomeDoUsuario = function (nome) {
      Configuracoes.nomeDoUsuario.definir(nome);

      alert("Salvo!");

      $window.location.reload();
    }

    vm.destinatarios = Destinatarios.obter();
    vm.nomeDoUsuario = Configuracoes.nomeDoUsuario.obter();
    vm.salvarNovoNomeDoUsuario = salvarNovoNomeDoUsuario;
  }
})();
