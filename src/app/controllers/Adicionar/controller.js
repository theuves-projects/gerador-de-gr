;(function () {
  "use strict";

  angular
    .module("app")
    .controller("Adicionar", Adicionar);

  function Adicionar(
      $location
    , $window
    , Configuracoes
    , Destinatarios
    , Guia
    , Malote
    , Processo
    , Tela
  ) {
    var ad = this;
    //////////////

    ad.destinatarios = Destinatarios.obter();

    ad.guia = Guia;

    ad.informarErro = function (evento) {
      if (evento.code === "Enter") {
        $window.alert("Por aqui, os dados não são formatados.")
      }
    };

    ad.gerarGuia = function () {
      var faltaNumero = !ad.guia.numero;
      var faltaMalote = !ad.guia.malote.numero && ad.guia.vai;
      var faltaDestinatario = !ad.guia.destinatario;
      var faltaProcessos = !ad.guia.processos.lista;

      if (
           faltaNumero
        || faltaMalote
        || faltaDestinatario
        || faltaProcessos
      ) {
        if (faltaNumero) {
         $window.alert("Informe o número da guia!");
        } else if (faltaMalote) {
          $window.alert("Informe o número do malote!");
        } else if (faltaDestinatario) {
          $window.alert("Informe o destinatário!");
        } else if (faltaProcessos) {
          $window.alert("Informe os processos!");
        }

        Tela.alertar("Erro", "Erro desconhecido!");
        return;
      }

      $location.url("/imprimir");
    };

    ad.adicionarDados = function (evento) {
      if (evento.code !== "Enter") return;

      var codigoDeBarras = ad.codigoDeBarras;

      if (codigoDeBarras) {

        var adicionarMalote = function (numeroDoProcesso) {

        }

        var adicionar = (function () {
          return {
            guia: function (numero) {
              var tahDefinido = ad.guia.numero;

              if (!tahDefinido || (tahDefinido && $window.confirm("Trocar?"))) {
                ad.guia.numero = parseInt(numero);
              }
            },
            malote: function (numero) {
              var tahDefinido = ad.guia.malote.numero;

              if (!tahDefinido || (tahDefinido && $window.confirm("Trocar?"))) {
                ad.guia.malote.numero = Malote.numero(numero);
              }

              var percurso = Malote.percurso(numero);
              var destinatario = Malote.destinatario(percurso);

              if (destinatario) {
                ad.guia.destinatario = destinatario;
              } else {
                $window.alert("Destinatário não localizado!")
              }
            },
            processo: function (numero) {
              var formatado = Processo.formatar(numero);

              ad.guia.processos.adicionar(formatado);
            }
          };
        })();

        var limparInput = function () {
          ad.codigoDeBarras = undefined;
        };

        var ehPraGerarGuia = codigoDeBarras === "GERAR";
        var ehPraAdicionarGuia = codigoDeBarras < 1000;
        var ehPraAdicionarMalote = codigoDeBarras.length === 35;
        var ehPraAdicionarProcesso = Processo.eh(codigoDeBarras);

        if (ehPraGerarGuia) {
          ad.gerarGuia();
          limparInput();
        } else if (ehPraAdicionarGuia) {
          adicionar.guia(codigoDeBarras);
          limparInput();
        } else if (ehPraAdicionarMalote) {
          adicionar.malote(codigoDeBarras);
          limparInput();
        } else if (ehPraAdicionarProcesso) {
          adicionar.processo(codigoDeBarras);
          limparInput();
        } else {
          $window.alert("Dado inválido!");
        }
      }
    };

    ad.removerProcesso = function (numero) {
      if (ad.guia.processos.tem(numero)) {
        if ($window.confirm("Certeza?")) {
          ad.guia.processos.remover(numero);
        } else {
          $window.alert("Tudo bem!");
        }
      } else {
        $window.alert("Erro!");
      }
    };
  }
})();
