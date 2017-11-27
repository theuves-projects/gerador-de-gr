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
    vm.adicionarDados = adicionarDados;
    vm.gerarGuia = gerarGuia;
    vm.removerProcesso = removerProcesso;

    ///

    function gerarGuia() {
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

    function adicionarDados(codigoDeBarras) {
      if (codigoDeBarras) {
        var Adicionar = {
          guia: function (numero) {
            var temGuia = vm.guia;
            var naoTemGuia = !temGuia;

            if (naoTemGuia || (temGuia && confirm("Trocar o número da guia?"))) {
              vm.guia = parseInt(numero) + 1;

              notificar("guia adicionada!");
            }
          },
          malote: function (numero) {
            var temMalote = vm.malote;
            var naoTemMalote = !temMalote;

            if (naoTemMalote || (temMalote && confirm("Trocar o número do malote?"))) {
              vm.malote = Malote.numero(numero);

              notificar("malote adicionado!");
            }

            /**
             * (a partir do número do malote, vai ser procurado o número
             * do percurso pra tentar desconbrir o destinatário do malote)
             */
            var destinatario = Malote.destinatario(Malote.percurso(numero));

            if (destinatario) {
              vm.destinatario = destinatario;
            } else {
              alert("Não foi possível obter o DESTINATÁRIO, desse cartão"
                + "operacional, portanto você vai precisar inseri-lo"
                + "manualmente.");
            }
          },
          processo: function (numero) {
            listaDeProcessos.push(Processo.formatar(numero));

            // (ver: "/app/indice/services/utilitarios.js")
            vm.processos = Utilitarios.montarLista(listaDeProcessos);

            notificar("processo adicionado!");
          }
        };

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
          Adicionar.guia(codigoDeBarras);
          limparInput();
        } else if (ehPraAdicionarMalote) {
          Adicionar.malote(codigoDeBarras);
          limparInput();
        } else if (Processo.eh(codigoDeBarras)) {
          Adicionar.processo(codigoDeBarras);
          limparInput();
        } else {
          alert("O número '" + codigoDeBarras +  "' é inválido!");
        }
      }

      return;
    }

    function removerProcesso(indice) {
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
