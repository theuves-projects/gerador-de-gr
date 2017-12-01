;(function () {
  "use strict";

  (angular)
  .module("configurar")
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
    , $location

      // personalizados
    , Configuracoes
    , Destinatarios
  ) {
    var vm = this;
    //////////////

    /**
     * criando funções
     * ---------------
     */

    function adicionarDestinatario(novoDestinatario) {
      vm.destinatarios.push(novoDestinatario);

      vm.novoDestinatario = "";
    }

    function removerDestinatario(indice) {
      delete vm.destinatarios[indice];

      vm.destinatarios = vm.destinatarios.filter(function (item) {
        return item;
      });
    }

    function salvarDestinatarios(novosDestinatarios) {
      Destinatarios.salvar(novosDestinatarios);

      alert("Salvo!");
    }

    function salvarNovoNomeDoUsuario(nome) {
      Configuracoes.NomeDoUsuario.definir(nome);

      alert("Salvo!");

      $window.location.reload();
    }

    function voltarPraPaginaInicial() {
      $location.path("/");
    }

    ///

    vm.destinatarios = Destinatarios.obter();
    vm.nomeDoUsuario = Configuracoes.NomeDoUsuario.obter();

    /**
     * chamando funções
     * ----------------
     */
    vm.adicionarDestinatario = adicionarDestinatario;
    vm.removerDestinatario = removerDestinatario;
    vm.salvarDestinatarios = salvarDestinatarios;
    vm.salvarNovoNomeDoUsuario = salvarNovoNomeDoUsuario;
    vm.voltarPraPaginaInicial = voltarPraPaginaInicial;
  }
})();
