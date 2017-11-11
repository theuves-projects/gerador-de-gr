;(function () {
  "use strict";

  angular
    .module("configurar.controller", [])
    .controller("Configurar", Configurar)
  ;

  function Configurar(
      $location
    , $timeout

    /**
     * personalizados
     */
    , Guia
    , Processo
    , Utilitarios
  ) {
    var vm = this;

    vm.notificar = {
      eh: false,
      mensagem: undefined
    };

    /**
     * função pra manipular "vm.notificar"
     */
    function notificar(mensagem) {
      vm.notificar.mensagem = mensagem;
      vm.notificar.eh = true;

      $timeout(function () {
        vm.notificar.eh = false;
      }, 1000);
    }

    /**
     * array que vai armazenar os
     * processos durante o a escaneamento
     */
    var PROCESSSOS = [];

    /**
     * funções
     * -------
     */
    vm.adicionar = adicionar;
    vm.criar = criar;
    vm.remover = remover;

    ///

    function adicionar() {

      var numero = vm.numero;

      /**
       * se o for o número da guia
       *
       * o número da guia deve começar com "g"
       * pra haver a indentificação
       */
      if (/^g\d+$/i.test(numero)) {

        /**
         * se guia já existir
         */
        if (
             !vm.guia
          || (vm.guia && confirm("Trocar o número da guia?"))
        ) {
          vm.guia = parseInt(vm.numero.replace(/^g/i, "")) + 1;

          notificar("guia adicionada!");

          vm.numero = "";
        }

        return;
      }

      /**
       * se for o código de barra dum malote
       */
      if (numero.length === 35) {
        var malote = Utilitarios.malote(numero);

        if (
             !vm.malote
          || (vm.malote && confirm("Trocar o número do malote?"))
        ) {

          if (vm.malote) {
            notificar("malote trocado!");
          } else {
            notificar("malote adicionado!");
          }

          vm.malote = malote.numero;
        }

        /**
         * procura o destinatário
         */
        var destinatario = Utilitarios.obterDestinatario(malote.percurso);

        /**
         * se o destinatário existir
         */
        if (destinatario) {
          vm.destinatario = destinatario;
        }

        vm.numero = "";

        return;
      }

      /**
       * analisar o número do processo
       */
      if (!Processo.eh(numero)) {
        alert("O número \"" + numero +  "\" é inválido!");

        return;
      }

      /**
       * formatar número do processo
       */
      numero = Processo.formatar(numero);

      PROCESSSOS.push(numero);

      vm.processos = Utilitarios.montarLista(PROCESSSOS);

      notificar("processo adicionado!")

      /**
       * limpar pra vir o próximo
       */
      vm.numero = "";
    }

    function criar() {
      if (
           !vm.guia
        || !vm.malote
        || !vm.destinatario
        || !vm.processos
      ) {
        var oQueFalta;

        if (!vm.guia) {
          oQueFalta = "o número da guia";
        } else if (!vm.malote) {
          oQueFalta = "o número do malote";
        } else if (!vm.destinatario) {
          oQueFalta = "o destinatário";
        } else {
          oQueFalta = "os processos";
        }

        alert("Informe " + oQueFalta + "!");

        return;
      }

      var processos = vm.processos;

      if (processos.length === 0) {
        alert("Nenhum dos dados informados é válido!");
      } else {
        Guia.definir(
            vm.guia
          , vm.destinatario
          , vm.malote
          , vm.processos
        );

        $location.url("/imprimir");
      }
    }

    function remover(indice) {

      /**
       * pedir confirmação pra deletar
       */
      if (!confirm("Tem certeza?")) {
        return;
      }

      var numeroPraRemover = vm.processos[indice].numero;

      /**
       * remover o item do público
       */
      vm.processos = Utilitarios
        .removerItem(
            vm.processos.reverse()
          , indice
        )
        .reverse()
      ;

      /**
       * remover o item do privado
       */
      PROCESSSOS = PROCESSSOS.filter(function (numero) {
        return numeroPraRemover !== numero;
      });

      vm.processos = Utilitarios.montarLista(PROCESSSOS);
    }
  }
})();
