;(function () {
  "use strict";

  (angular)
  .module("indice.controller", [])
  .controller("Indice", Indice);

  function Indice(
      $location
    , $timeout

    // personalizados
    , Configuracoes
    , Destinatarios
    , Guia
    , Malote
    , Processo
    , Utilitarios
  ) {
    var vm = this;
    //////////////

    vm.destinatarios = Destinatarios.obter();

    /**
     * array que vai armazenar os números
     * dos processos DURANTE o escaneamento
     *
     * (vai conter apenas strings com os
     * números dos processos)
     */
    var listaDeProcessos = [];

    /**
     * checar se há dados já registrados,
     * ou seja, se tá voltando da página "imprimir"
     */
    var dadosDaGuia = Guia.obter();
    var guiaNaoEstahVazia = angular.toJson(dadosDaGuia) !== "{}";

    if (guiaNaoEstahVazia) {

      /**
       * restabelecer dados
       * ------------------
       */

      vm.guia = dadosDaGuia.guia;
      vm.destinatario = dadosDaGuia.destinatario;
      vm.malote = dadosDaGuia.malote;
      vm.processos = dadosDaGuia.processos;

      ////////////////////////////////////////////////
      listaDeProcessos = dadosDaGuia.listaDeProcessos;
    }

    vm.notificar = {
      exibir: false,
      mensagem: undefined
    };

    function notificar(mensagem) {
      vm.notificar.mensagem = mensagem;
      vm.notificar.exibir = true;

      $timeout(function () {
        /**
         * não vai remover a mensagem
         * pois se ela for removida vai causar um
         * efeito estranho na animação
         *
         * (a mensagem some antes da <div>)
         */

        vm.notificar.exibir = false;
      }, 1500);
    }

    /**
     * funções
     * -------
     */
    vm.gerarGuia = gerarGuia;
    vm.adicionarDados = adicionarDados;
    vm.adicionarGuia = adicionarGuia;
    vm.adicionarMalote = adicionarMalote;
    vm.removerProcesso = removerProcesso;

    ///

    var gerarGuia = function () {
      var estahFaltando = {
          guia: !vm.guia
        , malote: !vm.malote && !Guia.naoTemMalote(vm.destinatario)
        , destinatario: !vm.destinatario
        , processos: !vm.processos
      };

      if (
           estahFaltando.guia
        || estahFaltando.malote
        || estahFaltando.destinatario
        || estahFaltando.processos
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
        , listaDeProcessos
      );

      $location.url("/imprimir");
    }

    var adicionarDados = function (codigoDeBarras) {
      if (codigoDeBarras) {
        function adicionarGuia() {
          var temGuia = vm.guia;
          var naoTemGuia = !temGuia;

          if (naoTemGuia || (temGuia && confirm("Trocar o número da guia?"))) {
            vm.guia = parseInt(codigoDeBarras) + 1;

            notificar("Guia adicionada!");
          }
        }

        function adicionarMalote() {
          var temMalote = vm.malote;
          var naoTemMalote = !temMalote;

          if (naoTemMalote || (temMalote && confirm("Trocar o número do malote?"))) {
            vm.malote = Malote.numero(codigoDeBarras);

            notificar("Malote adicionado!");
          }

          /**
           * (a partir do número do malote, vai ser procurado o número
           * do percurso pra tentar desconbrir o destinatário do malote)
           */
          var destinatario = Malote.destinatario(Malote.percurso(codigoDeBarras));

          if (destinatario) {
            vm.destinatario = destinatario;
          } else {
            alert("Não foi possível obter o DESTINATÁRIO, desse cartão"
              + "operacional, portanto você vai precisar inseri-lo"
              + "manualmente.");
          }
        }

        function adicionarProcesso() {
          listaDeProcessos.push(Processo.formatar(codigoDeBarras));

          // (ver: "app/indice/services/utilitarios.js")
          vm.processos = Utilitarios.montarLista(listaDeProcessos);

          notificar("Processo adicionado!");
        }

        function limparInput() {
          vm.codigoDeBarras = undefined;
        }

        var ehPraGerarGuia = codigoDeBarras === "GERAR";
        var ehPraAdicionarGuia = codigoDeBarras < 1000;
        var ehPraAdicionarMalote = codigoDeBarras.length === 35;

        if (ehPraGerarGuia) {
          gerarGuia();
          limparInput();
        } else if (ehPraAdicionarGuia) {
          adicionarGuia();
          limparInput();
        } else if (ehPraAdicionarMalote) {
          adicionarMalote();
          limparInput();
        } else if (Processo.eh(codigoDeBarras)) {
          adicionarProcesso();
          limparInput();
        } else {
          alert("O número '" + codigoDeBarras +  "' é inválido!");
        }
      }

      return;
    }

    // (privado)
    function exibirAlerta() {
      alert("[Atenção]\n\n"
          + "Não é possível adicionar"
          + " dados escaeados por aqui...");
    }

    var adicionarGuia = function(evento) {
      if (evento.code === "Enter") exibirAlerta();
    }

    var adicionarMalote = function(evento) {
      if (evento.code === "Enter") exibirAlerta();
    }

    var removerProcesso = function(indice) {
      var remocaoRecusada = !confirm("Tem certeza?");

      if (remocaoRecusada) return;

      listaDeProcessos = listaDeProcessos.filter(function (numero) {
        var numeroPraRemover = vm
          .processos
          .reverse()[indice]
          .numero;

        return numero !== numeroPraRemover;
      });

      vm.processos = Utilitarios.montarLista(listaDeProcessos);
    }
  }
})();
