;(function (angular) {
  "use strict";

  angular
    .module("app")
    .controller("Indice", Indice);

  function Indice(
      $location
    , $window
    , Destinatarios
    , Guia
    , Processo
  ) {
    var ind = this;
    //////////////

    ind.destinatarios = Destinatarios.obter();

    ind.guia = Guia;

    ind.abrirConfiguracoes = function abrirConfiguracoes() {
      $location.url("/configuracoes");
    };

    ind.adicionarDados = function adicionarDados() {
      if (angular.isUndefined(ind.codigoDeBarras)) {
        $window.alert("Informe algo!");
        return;
      }

      var ehProcesso = Processo.eh(ind.codigoDeBarras);

      if (!ehProcesso) {
        $window.alert("Inválido!");
        return;
      }

      var numeroFormatado = Processo.formatar(ind.codigoDeBarras);

      ind.guia.processos.adicionar(numeroFormatado);
      ind.codigoDeBarras = undefined;
    };

    ind.gerarGuia = function gerarGuia() {
      var faltaNumero = !ind.guia.numero;
      var faltaMalote = ind.guia.malote.vai && !ind.guia.malote.numero;
      var faltaDestinatario = !ind.guia.destinatario;
      var faltaProcessos = ind.guia.processos.tahVazio();

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

      var numeroEhInValido = !/^\d+$/.test(ind.guia.numero);
      var maloteEhInValido = ind.guia.malote.vai && !/^\d{5}$/.test(ind.guia.malote.numero);

      if (numeroEhInValido || maloteEhInValido) {
        var mensagem =
            numeroEhInValido? "O número da guia é inválido!"
          : maloteEhInValido? "O número do malote é inválido!"
          : "Erro!";

        $window.alert(mensagem);
        return;
      }

      $location.url("/impressao");
    };

    ind.informarErro = function informarErro(evento) {
      if (evento.code !== "Enter") return;
      $window.alert("Por aqui, os dados não são formatados.");
    };

    ind.criarNovo = function criarNovo() {
      var fazer = $window.confirm("Certeza?");

      if (fazer) $window.location.reload();
    };

    ind.removerProcesso = function removerProcesso(numero) {
      if (ind.guia.processos.tem(numero)) {
        var fazer = $window.confirm("Certeza?");

        if (fazer) ind.guia.processos.remover(numero);
        return;
      }

      $window.alert("Erro!");
    };
  }
})(this.angular);
