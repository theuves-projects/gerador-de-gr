;(function () {
  "use strict";

  angular
    .module("app")
    .controller("Adicionar", Adicionar);

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
    var ad = this;
    //////////////

    ad.guia = (function () {
      var guiaAntiga = Guia.obter();
      var guiaNova = {};

      if (angular.equals(guiaAntiga, {})) {
        angular.extend(guiaNova, {vaiMalote: true});
      } else {
        angular.extend(guiaNova, guiaAntiga);
      }

      angular.extend(guiaNova, {
        atualizarProcessos: function () {
          this.processos = Processos.obter();
        },
        temProcessos: function () {
          return angular.isDefined(this.processos)
            && !angular.equals(this.processos, []);
        }
      });

      return guiaNova;
    })();

    ad.listaDeDestinatarios = Destinatarios.obter();

    ad.informarErro = function (evento) {
      if (evento.code === "Enter") {
        Tela.alertar("Atenção", "Não é possível adicionar dados por aqui...");
      }
    };

    ad.gerarGuia = function () {
      var tahFaltandoNumero = !ad.guia.numero;
      var tahFaltandoMalote = !ad.guia.malote && ad.guia.vaiMalote;
      var tahFaltandoDestinatario = !ad.guia.destinatario;
      var tahFaltandoProcessos = !ad.guia.processos;

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
          ad.guia.numero
        , ad.guia.destinatario
        , ad.guia.malote
        , ad.guia.processos
        , ad.guia.vaiMalote
      );

      $location.url("/imprimir");
    };

    ad.adicionarDados = function (evento) {

      // se NÃO FOI a tecla "enter" que foi pressionada
      if (evento.code !== "Enter") {
        return;
      }

      var codigoDeBarras = ad.codigoDeBarras;

      if (codigoDeBarras) {
        var adicionarGuia = function (numeroDoProcesso) {
          var temGuia = ad.guia.numero;

          if (!temGuia || (temGuia && Tela.confirmar("Atenção", "Trocar o número da guia?"))) {
            ad.guia.numero = parseInt(numeroDoProcesso) + 1;
          }
        }

        var adicionarMalote = function (numeroDoProcesso) {
          var temMalote = ad.guia.malote;

          if (!temMalote || (temMalote && Tela.confirmar("Atenção", "Trocar o número do malote?"))) {
            ad.guia.malote = Malote.numero(numeroDoProcesso);
          }

          var destinatario = Malote.destinatario(Malote.percurso(numeroDoProcesso));

          if (destinatario) {
            ad.guia.destinatario = destinatario;
          } else {
            Tela.alertar("Erro", [
                "Não foi possível obter o DESTINATÁRIO, desse cartão"
              , " operacional, portanto você vai precisar inseri-lo"
              , " manualmente."
            ]);
          }
        }

        var adicionarProcesso = function (numeroDoProcesso) {
          numeroDoProcesso = Processo.formatar(numeroDoProcesso);
          Processos.adicionar(numeroDoProcesso);

          ad.guia.atualizarProcessos();
        }

        var limparInput = function () {
          ad.codigoDeBarras = angular.noop();
        }

        var ehPraGerarGuia = codigoDeBarras === "GERAR";
        var ehPraAdicionarGuia = codigoDeBarras < 1000;
        var ehPraAdicionarMalote = codigoDeBarras.length === 35;

        if (ehPraGerarGuia) {
          ad.gerarGuia();
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

    ad.removerProcesso = function (numeroDoProcesso) {
      if (Tela.confirmar("Atenção", "Tem certeza?")) {
        Processos.remover(numeroDoProcesso);

        ad.guia.atualizarProcessos();
      }
    };

    ad.volume = {
      aumentar: function (numeroDoProcesso) {
        Processos.aumentarVolume(numeroDoProcesso);

        ad.guia.atualizarProcessos();
      },
      diminuir: function (numeroDoProcesso) {
        if (Processos.obter(numeroDoProcesso).volume === 1) {
          Tela.alertar("Erro", "Não é possível diminuir mais que isso.");
        } else {
          Processos.diminuirVolume(numeroDoProcesso);

          ad.guia.atualizarProcessos();
        }
      }
    };
  }
})();
