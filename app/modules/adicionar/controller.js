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
    var adic = this;
    ////////////////

    adic.guia = (function () {
      var guiaAntiga = Guia.obter();

      // se, de fato, existir uma guia antiga
      if (angular.equals(guiaAntiga, {})) {
        return {
          vaiMalote: true
        };
      }

      return Guia.obter();
    })();

    adic.listaDeDestinatarios = Destinatarios.obter();

    adic.informarErro = function (evento) {
      if (evento.code === "Enter") {
        Tela.alertar("Atenção", "Não é possível adicionar dados por aqui...");
      }
    };

    adic.gerarGuia = function () {
      var tahFaltandoNumero = !adic.guia.numero
      var tahFaltandoMalote = !adic.guia.malote && adic.guia.vaiMalote
      var tahFaltandoDestinatario = !adic.guia.destinatario
      var tahFaltandoProcessos = !adic.guia.processos

      if (
           tahFaltandoNumero
        || tahFaltandoMalote
        || tahFaltandoDestinatario
        || tahFaltandoProcessos
      ) {
        var oQueFalta;

        if (tahFaltandoNumero) {
          oQueFalta = "o número da guia";
        } else if (tahFaltandoMalote) {
          oQueFalta = "o número do malote";
        } else if (tahFaltandoDestinatario) {
          oQueFalta = "o destinatário";
        } else if (tahFaltandoProcessos) {
          oQueFalta = "os processos";
        } else {
          Tela.alertar("Erro", "Erro desconhecido!");

          return;
        }

        Tela.alertar("Atenção", "Informe " + oQueFalta + "!");

        return;
      }

      Guia.definir(
          adic.guia.numero
        , adic.guia.destinatario
        , adic.guia.malote
        , adic.guia.processos
        , adic.guia.vaiMalote
      );

      $location.url("/imprimir");
    };

    adic.adicionarDados = function (evento) {

      // se NÃO FOI a tecla "enter" que foi pressionada
      if (evento.code !== "Enter") {
        return;
      }

      var codigoDeBarras = adic.codigoDeBarras;

      if (codigoDeBarras) {
        function adicionarGuia(numeroDoProcesso) {
          var temGuia = adic.guia.numero;

          if (!temGuia || (temGuia && Tela.confirmar("Atenção", "Trocar o número da guia?"))) {
            adic.guia.numero = parseInt(numeroDoProcesso) + 1;
          }
        }

        function adicionarMalote(numeroDoProcesso) {
          var temMalote = adic.guia.malote;

          if (!temMalote || (temMalote && Tela.confirmar("Atenção", "Trocar o número do malote?"))) {
            adic.guia.malote = Malote.numero(numeroDoProcesso);
          }

          var destinatario = Malote.destinatario(Malote.percurso(numeroDoProcesso));

          if (destinatario) {
            adic.guia.destinatario = destinatario;
          } else {
            Tela.alertar("Erro", [
                "Não foi possível obter o DESTINATÁRIO, desse cartão"
              , " operacional, portanto você vai precisar inseri-lo"
              , " manualmente."
            ]);
          }
        }

        function adicionarProcesso(numeroDoProcesso) {
          numeroDoProcesso = Processo.formatar(numeroDoProcesso);
          Processos.adicionar(numeroDoProcesso);

          adic.guia.processos = Processos.obter();
        }

        function limparInput() {
          adic.codigoDeBarras = angular.noop();
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
    };

    adic.removerProcesso = function (numeroDoProcesso) {
      if (Tela.confirmar("Atenção", "Tem certeza?")) {
        Processos.remover(numeroDoProcesso);

        adic.guia.processos = Processos.obter();
      }
    };

    adic.volume = {
      aumentar: function (numeroDoProcesso) {
        Processos.aumentarVolume(numeroDoProcesso);

        adic.processos = Processos.obter();
      },
      diminuir: function (numeroDoProcesso) {
        if (Processos.obter(numeroDoProcesso).volume === 1) {
          Tela.alertar("Erro", "Não é possível diminuir mais que isso.");
        } else {
          Processos.diminuirVolume(numeroDoProcesso);

          adic.processos = Processos.obter();
        }
      }
    };
  }
})();
