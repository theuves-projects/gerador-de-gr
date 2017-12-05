;(function () {
  "use strict";

  angular
    .module("adicionar")
    .controller("Adicionar", Adicionar);

  Adicionar.$inject = [
      "$location"
    , "$timeout"

    // personalizados
    , "Configuracoes"
    , "Destinatarios"
    , "Guia"
    , "Malote"
    , "Processo"
    , "Processos"
    , "Tela"
  ];

  function Adicionar(
      $location
    , $timeout
    , Configuracoes
    , Destinatarios
    , Guia
    , Malote
    , Processo
    , Processos
    , Tela
  ) {
    var vm = this;
    //////////////

    vm.guia = {};

    vm.listaDeDestinatarios = Destinatarios.obter();
    vm.guia.vaiMalote = true;

    /**
     * checar se há dados já registrados,
     * ou seja, se tá voltando da página "imprimir"
     */
    var dadosDaGuia = Guia.obter();
    var guiaNaoEstahVazia = angular.toJson(dadosDaGuia) !== "{}";

    if (guiaNaoEstahVazia) {

      /**
       * restabelecer dados
       * ==================
       */

      vm.guia.numero = dadosDaGuia.numero;
      vm.guia.destinatario = dadosDaGuia.destinatario;
      vm.guia.malote = dadosDaGuia.malote;
      vm.guia.processos = dadosDaGuia.processos;
      vm.guia.vaiMalote = dadosDaGuia.vaiMalote;
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

    // funções
    vm.gerarGuia = gerarGuia;
    vm.adicionarDados = adicionarDados;
    vm.adicionarGuia = adicionarGuia;
    vm.adicionarMalote = adicionarMalote;
    vm.removerProcesso = removerProcesso;
    vm.aumentarVolume = aumentarVolume;
    vm.diminuirVolume = diminuirVolume;

    function gerarGuia() {
      var estahFaltando = {
          guia: !vm.guia.numero
        , malote: !vm.guia.malote && vm.guia.vaiMalote
        , destinatario: !vm.guia.destinatario
        , processos: !vm.guia.processos
      };

      if (
           estahFaltando.guia
        || estahFaltando.malote
        || estahFaltando.destinatario
        || estahFaltando.processos
      ) {
        var oQueFalta;

        if (!vm.guia.numero) {
          oQueFalta = "o número da guia";
        } else if (!vm.guia.malote) {
          oQueFalta = "o número do malote";
        } else if (!vm.guia.destinatario) {
          oQueFalta = "o destinatário";
        } else {
          oQueFalta = "os processos";
        }

        alert("Informe " + oQueFalta + "!");

        return;
      }

      Guia.adicionar(
          vm.guia.numero
        , vm.guia.destinatario
        , vm.guia.malote
        , vm.guia.processos
        , vm.guia.vaiMalote
      );

      $location.url("/imprimir");
    }

    function adicionarDados(evento) {
      if (evento.code !== "Enter") return;

      var codigoDeBarras = vm.codigoDeBarras;

      if (codigoDeBarras) {
        function adicionarGuia(numeroDoProcesso) {
          var temGuia = vm.guia.numero;

          if (!temGuia || (temGuia && Tela.confirmar("Atenção", "Trocar o número da guia?"))) {
            vm.guia.numero = parseInt(numeroDoProcesso) + 1;

            notificar("Guia adicionada!");
          }
        }

        function adicionarMalote(numeroDoProcesso) {
          var temMalote = vm.guia.malote;

          if (!temMalote || (temMalote && Tela.confirmar("Atenção", "Trocar o número do malote?"))) {
            vm.guia.malote = Malote.numero(numeroDoProcesso);

            notificar("Malote adicionado!");
          }

          /**
           * (a partir do número do malote, vai ser procurado o número
           * do percurso pra tentar desconbrir o destinatário do malote)
           */
          var destinatario = Malote.destinatario(Malote.percurso(numeroDoProcesso));

          if (destinatario) {
            vm.guia.destinatario = destinatario;
          } else {
            Tela.alertar("Erro", "Não foi possível obter o DESTINATÁRIO, desse cartão"
              + "operacional, portanto você vai precisar inseri-lo"
              + "manualmente.");
          }
        }

        function adicionarProcesso(numeroDoProcesso) {
          numeroDoProcesso = Processo.formatar(numeroDoProcesso);
          Processos.adicionar(numeroDoProcesso);

          vm.guia.processos = Processos.obter();

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
          adicionarGuia(codigoDeBarras);
          limparInput();
        } else if (ehPraAdicionarMalote) {
          adicionarMalote(codigoDeBarras);
          limparInput();
        } else if (Processo.eh(codigoDeBarras)) {
          adicionarProcesso(codigoDeBarras);
          limparInput();
        } else {
          alert("O número '" + codigoDeBarras +  "' é inválido!");
        }
      }
    }

    function adicionarGuia(evento) {
      if (evento.code === "Enter") {
        Tela.alertar("Atenção", "Não é possível adicionar dados por aqui...");
      }
    }

    function adicionarMalote(evento) {
      if (evento.code === "Enter") {
        Tela.alertar("Atenção", "Não é possível adicionar dados por aqui...");
      }
    }

    function removerProcesso(numeroDoProcesso) {
      if (Tela.confirmar("Atenção", "Tem certeza?")) {
        Processos.remover(numeroDoProcesso);

        vm.guia.processos = Processos.obter();
      }
    }

    function aumentarVolume(numeroDoProcesso) {
      Processos.aumentarVolume(numeroDoProcesso);

      vm.processos = Processos.obter();
    }

    function diminuirVolume(numeroDoProcesso) {
      if (Processos.obter(numeroDoProcesso).volume === 1) {
        Tela.alertar("Erro", "Não é possível diminuir mais que isso.");
      } else {
        Processos.diminuirVolume(numeroDoProcesso);

        vm.processos = Processos.obter();
      }
    }
  }
})();
