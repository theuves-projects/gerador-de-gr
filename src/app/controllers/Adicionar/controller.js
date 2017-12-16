;(function () {
  "use strict";

  angular
    .module("app")
    .controller("Adicionar", Adicionar);

  function Adicionar(
      $location
    , $window
    , Destinatarios
    , Guia
    , Malote
    , Processo
  ) {
    var ad = this;
    //////////////

    ad.destinatarios = Destinatarios.obter();

    ad.guia = Guia;

    ad.adicionarDados = function (evento) {
      if (evento.code === "Enter") {
        var ehComando = ad.codigoDeBarras.charAt(0) === ":";

        if (ehComando) {
          var comando = ad.codigoDeBarras
            .substr(1)
            .toUpperCase();

          switch (comando) {
            case "GERAR":
              ad.gerarGuia();
              ad.codigoDeBarras = undefined;
              break;

            default:
              $window.alert("Comando inválido!");
          }

          return;
        }

        var ehGuia = ad.codigoDeBarras < 1000;
        var ehMalote = ad.codigoDeBarras.length === 35;
        var ehProcesso = Processo.eh(ad.codigoDeBarras);

        // Guia:
        // =====
        if (ehGuia) {
          var tahDefinido = ad.guia.numero;

          if (tahDefinido) {
            var trocar = $window.confirm("Trocar?");

            if (trocar) {
              ad.guia.numero = parseInt(ad.codigoDeBarras);
            }
          }

          ad.codigoDeBarras = undefined;
          return;
        }

        // Malote:
        // =======
        if (ehMalote) {
          var tahDefinido = ad.guia.malote.numero;

          if (tahDefinido) {
            var trocar = $window.confirm("Trocar?");

            if (trocar) {
              ad.guia.malote.numero = Malote.numero(ad.codigoDeBarras);
            }
          }

          ad.codigoDeBarras = undefined;
          return;
        }

        // Processo:
        // =========
        if (ehProcesso) {
          var numeroFormatado = Processo.formatar(ad.codigoDeBarras);

          ad.guia.processos.adicionar(numeroFormatado);

          ad.codigoDeBarras = undefined;
          return;
        }

        $window.alert("Inválido!");
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
        } else {
          alert("Erro!");
        }

        return;
      }

      $location.url("/imprimir");
    };

    ad.informarErro = function (evento) {
      if (evento.code === "Enter") {
        $window.alert("Por aqui, os dados não são formatados.")
      }
    };

    ad.removerProcesso = function (numero) {
      if (ad.guia.processos.tem(numero)) {
        if ($window.confirm("Certeza?")) {
          ad.guia.processos.remover(numero);
        }
      } else {
        $window.alert("Erro!");
      }
    };
  }
})();
