;(function (angular) {
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

    ad.abrirConfiguracoes = function abrirConfiguracoes() {
      $location.url("/configurar");
    };

    ad.adicionarDados = function adicionarDados() {
      if (angular.isUndefined(ad.codigoDeBarras)) {
        $window.alert("Informe algo!");
        return;
      }

      var ehComando = ad.codigoDeBarras.startsWith(":");

      if (ehComando) {
        var comando = ad.codigoDeBarras
          .trim()
          .substr(1)
          .toUpperCase();

        switch (comando) {
          case "CONFIGURAR":
            ad.abrirConfiguracoes();
            ad.codigoDeBarras = undefined;
            break;
          case "GERAR":
            ad.gerarGuia();
            ad.codigoDeBarras = undefined;
            break;
          case "CRIAR-NOVA":
            ad.criarNovo();
            ad.codigoDeBarras = undefined;
            break;
          case "MUDAR-MALOTE":
            ad.guia.malote.vai = !ad.guia.malote.vai;
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

      if (
           !ehGuia
        && !ehMalote
        && !ehProcesso
      ) {
        $window.alert("Inválido!");
        return;
      }

      if (ehGuia) {
        var tahDefinido = ad.guia.numero;
        var tipoNumber = parseInt(ad.codigoDeBarras);
        var fazer = tahDefinido ? $window.confirm("Trocar?") : true;

        if (fazer) ad.guia.numero = tipoNumber;
      }

      if (ehMalote) {
        var tahDefinido = ad.guia.malote.numero;
        var malote = Malote.numero(ad.codigoDeBarras);
        var fazer = tahDefinido ? $window.confirm("Trocar?") : true;

        if (fazer) ad.guia.malote.numero = malote;
      }

      if (ehProcesso) {
        var numeroFormatado = Processo.formatar(ad.codigoDeBarras);

        ad.guia.processos.adicionar(numeroFormatado);
      }

      ad.codigoDeBarras = undefined;
    };

    ad.gerarGuia = function gerarGuia() {
      var faltaNumero = !ad.guia.numero;
      var faltaMalote = ad.guia.malote.vai && !ad.guia.malote.numero;
      var faltaDestinatario = !ad.guia.destinatario;
      var faltaProcessos = ad.guia.processos.tahVazio();

      if (
           faltaNumero
        || faltaMalote
        || faltaDestinatario
        || faltaProcessos
      ) {
        var mensagem =
            faltaNumero? "Informe o número da guia!"
          : faltaMalote? "Informe o número do malote!"
          : faltaDestinatario? "Informe o destinatário!"
          : faltaProcessos? "Informe os processos!"
          : "Erro!";

        $window.alert(mensagem);
        return;
      }

      var numeroEhInValido = !/^\d+$/.test(ad.guia.numero);
      var maloteEhInValido = ad.guia.malote.vai && !/^\d{5}$/.test(ad.guia.malote.numero);

      if (numeroEhInValido || maloteEhInValido) {
        var mensagem =
            numeroEhInValido? "O número da guia é inválido!"
          : maloteEhInValido? "O número do malote é inválido!"
          : "Erro!";

        $window.alert(mensagem);
        return;
      }

      $location.url("/imprimir");
    };

    ad.informarErro = function informarErro(evento) {
      if (evento.code !== "Enter") return;
      $window.alert("Por aqui, os dados não são formatados.");
    };

    ad.criarNovo = function criarNovo() {
      var fazer = $window.confirm("Certeza?");

      if (fazer) $window.location.reload();
    };

    ad.removerProcesso = function removerProcesso(numero) {
      if (ad.guia.processos.tem(numero)) {
        var fazer = $window.confirm("Certeza?");

        if (fazer) ad.guia.processos.remover(numero);
        return;
      }

      $window.alert("Erro!");
    };
  }
})(this.angular);
