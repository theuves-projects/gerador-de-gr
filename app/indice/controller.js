;(function () {
  "use strict";

  angular
    .module("indice.controller", [])
    .controller("Indice", Indice)
  ;

  function Indice(
      $location
    , $timeout

    /**
     * personalizados
     */
    , Guia
    , Destinatarios
    , Malote
    , Processo
    , Utilitarios
  ) {
    var vm = this;

    vm.destinatarios = Destinatarios.obter();

    /**
     * array que vai armazenar os
     * processos durante o a escaneamento
     *
     * (vai conter apenas strings com o
     * número dos processos)
     *
     * não é uma constante, que normalmente
     * colocam em caixa-alta, mas que se foda
     */
    var LISTA_DE_PROCESSOS = [];

    /**
     * checar se há dados já registrados,
     * ou seja, se tá voltando da página "imprimir"
     *
     * vai ser utilizado somente o número da
     * guia pra fazer a verificação
     */
    if (Guia.obter().guia) {

      /**
       * restabelecer dados
       * ------------------
       */

      var guia = Guia.obter();

      vm.guia = guia.guia;
      vm.destinatario = guia.destinatario;
      vm.malote = guia.malote;
      vm.processos = guia.processos;

      LISTA_DE_PROCESSOS = guia.LISTA_DE_PROCESSOS;
    }

    /**
     * informações pra <div> da notificação
     */
    vm.notificar = {
      exibir: false,
      mensagem: undefined
    };

    /**
     * função pra manipular "vm.notificar"
     */
    function notificar(mensagem) {

      /**
       * adicionar mensagem e exibir a notificação
       */
      vm.notificar.mensagem = mensagem;
      vm.notificar.exibir = true;

      /**
       * esperar 1,5 segundos e esconder a notificação
       */
      $timeout(function () {

        /**
         * não vai remover ou trocar a mensagem,
         * pois se ela for removida vai causar um
         * efeito estranho na animação (a mensagem
         * ia sumir antes da <div>)
         */
        vm.notificar.exibir = false;
      }, 1500);
    }

    /**
     * funções
     * -------
     */
    vm.adicionar = adicionar;
    vm.gerar = gerar;
    vm.remover = remover;

    ///

    /**
     * função pra gerar a guia
     */
    function gerar() {

      /**
       * se não houver algum dado necessário
       */
      if (
           !vm.guia
        || (!vm.malote && !Guia.naoTemMalote(vm.destinatario))
        || !vm.destinatario
        || !vm.processos
      ) {

        /**
         * informa o que falta
         */
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

      Guia.definir(
          vm.guia
        , vm.destinatario
        , vm.malote
        , vm.processos

        /**
         * isso não vai ser usado pra
         * gerar a guia, mas vai ser necessário
         * caso o usuário volte pra página inicial
         */
        , LISTA_DE_PROCESSOS
      );

      /**
       * vai pra página de impressão
       */
      $location.url("/imprimir");
    }

    /**
     * função pra adicionar processos na lista
     */
    function adicionar() {
      var codigoDeBarras = vm.codigoDeBarras;

      if (!codigoDeBarras) {
        return "";
      }

      /**
       * função pra limpar o conteúdo da
       * lista de dados escaneados
       */
      function limpar() {
        vm.codigoDeBarras = "";
      }

      if (codigoDeBarras === "GERAR") {
        gerar();

        limpar();

        return;
      }

      /**
       * se for o número da guia
       *
       * vou usar 1.000 como referência
       * de um número de guia praticamente
       * impossível de se chegar
       */
      if (codigoDeBarras < 1000) {

        if (
             !vm.guia
          || (vm.guia && confirm("Trocar o número da guia?"))
        ) {

          /**
           * aumentar o número da guia
           */
          vm.guia = parseInt(codigoDeBarras) + 1;

          notificar("guia adicionada!");

          limpar();
        }

        return;
      }

      /**
       * se for o código de barra dum malote
       *
       * (sempre tem 30 dígitos)
       */
      if (codigoDeBarras.length === 35) {
        if (
             !vm.malote
          || (vm.malote && confirm("Trocar o número do malote?"))
        ) {

          /**
           * se o número do malote já tinha sido
           * definido e ele tá sendo trocado
           */
          var estahTrocando = vm.malote;

          vm.malote = Malote.numero(codigoDeBarras);

          if (estahTrocando) {
            notificar("malote trocado!");
          } else {
            notificar("malote adicionado!");
          }
        }

        /**
         * a partir do número do malote, vai ser
         * procurado o número do percurso pra
         * desconbrir de qual cidade e vara
         * é o malote
         *
         * se o número do percurso, no malote que
         * tá sendo analisado, já foi registrado,
         * então ele vai corresponder o destinatário
         */
        var destinatario = Malote
          .destinatario(
            Malote.percurso(vm.codigoDeBarras)
          )
        ;

        /**
         * se o destinatário existir
         */
        if (destinatario) {
          vm.destinatario = destinatario;

        /**
         * ...senão
         */
        } else {
          alert(
              "Não foi possível obter o DESTINATÁRIO"
            + ", desse cartão operacional"
            + ", portanto você vai precisar inseri-lo manualmente."
          );
        }

        limpar();

        return;
      }

      /**
       * se o número do processo for inválido
       */
      if (!Processo.eh(codigoDeBarras)) {
        alert("O número \"" + codigoDeBarras +  "\" é inválido!");

        return;
      }

      /**
       * formatar número do processo
       */
      codigoDeBarras = Processo.formatar(codigoDeBarras);

      /**
       * adicionar o número na lista de
       * processos já adicionados
       */
      LISTA_DE_PROCESSOS.push(codigoDeBarras);

      /**
       * montar lista de processos
       *
       * (ver: "/app/indice/services/utilitarios.js")
       */
      vm.processos = Utilitarios.montarLista(LISTA_DE_PROCESSOS);

      notificar("processo adicionado!");

      limpar();
    }

    /**
     * função pra remover um processo da lista
     */
    function remover(indice) {

      /**
       * pedir confirmação pra deletar
       *
       * se não for recusado
       */
      if (!confirm("Tem certeza?")) {
        return;
      }

      /**
       * processo que vai ter que ser removido
       */
      var numeroPraRemover = vm
        .processos[
          (vm.processos.length - 1) - indice
        ]
        .numero
      ;

      /**
       * remover item do público
       */
      vm.processos = Utilitarios
        .removerItem(
            vm.processos.reverse()
          , indice
        )
        .reverse()
      ;

      /**
       * remover o item da
       * lista de processos adicionados
       */
      LISTA_DE_PROCESSOS = LISTA_DE_PROCESSOS
        .filter(function (numero) {

          /**
           * retorna somente se o processo
           * não for o que foi removido
           */
          return numeroPraRemover !== numero;
        })
      ;

      /**
       * remonta lista de processos
       */
      vm.processos = Utilitarios
        .montarLista(LISTA_DE_PROCESSOS)
      ;
    }
  }
})();
