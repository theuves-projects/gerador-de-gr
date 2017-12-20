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
    ///////////////

    ind.destinatarios = Destinatarios.obter();

    ind.guia = Guia;

    ind.abrirConfiguracoes = function abrirConfiguracoes() {
      $location.url("/configuracoes");
    };

    ind.adicionarProcesso = function adicionarProcesso() {
      var tahLimpo = !ind.codigoDeBarras || !ind.codigoDeBarras.trim();

      if (tahLimpo) {
        $window.alert("Informe algo!");
        return;
      }

      var ehValido = Processo.ehValido(ind.codigoDeBarras);
      var numero = ehValido
        ? Processo.formatar(ind.codigoDeBarras)
        : ind.codigoDeBarras;

      ind.guia.processos.adicionar(numero, ehValido);
      ind.codigoDeBarras = undefined;
    };

    ind.gerarGuia = function gerarGuia() {
      var faltaNumero = !ind.guia.numero;
      var faltaMalote = ind.guia.malote.vai && !ind.guia.malote.numero;
      var faltaDestinatario = !ind.guia.destinatario;
      var faltaProcessos = ind.guia.processos.tahVazio();

      var msgDeFalta =
          faltaNumero? "Informe o número da guia!"
        : faltaMalote? "Informe o número do malote!"
        : faltaDestinatario? "Informe o destinatário!"
        : faltaProcessos? "Informe os processos!"
        : undefined;

      if (angular.isDefined(msgDeFalta)) {
        $window.alert(msgDeFalta);
        return;
      }

      var numeroEhInvalido = !/^\d+$/.test(ind.guia.numero);
      var maloteEhInvalido = !/^\d{5}$/.test(ind.guia.malote.numero);

      var msgDeInvalido =
          numeroEhInvalido? "O número da guia é inválido!"
        : maloteEhInvalido? "O número do malote é inválido!"
        : undefined;

      if (angular.isDefined(msgDeInvalido)) {
        $window.alert(msgDeInvalido);
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
})(window.angular);
