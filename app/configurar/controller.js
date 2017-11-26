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
  function Configurar(Destinatarios) {
    var vm = this;
    //////////////

    vm.destinatarios = Destinatarios.obter();
  }
})();
