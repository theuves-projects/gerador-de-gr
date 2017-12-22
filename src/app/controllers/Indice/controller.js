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
    , Historico
    , Processo
  ) {
    var ind = this;
    ///////////////

    ind.destinatarios = Destinatarios.obter();

    ind.guia = new Guia.constructor(Historico);

    ind.adicionarProcesso = function () {
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

    ind.gerarGuia = function () {
      var faltaNumero = !ind.guia.numero;
      var faltaMalote = !ind.guia.malote;
      var faltaDestinatario = !ind.guia.destinatario;
      var faltaProcessos = ind.guia.processos.tahVazio();

      var msgDeFalta =
          faltaNumero? "Informe o número da guia!"
        : faltaDestinatario? "Informe o destinatário!"
        : faltaProcessos? "Informe os processos!"
        : undefined;

      if (angular.isDefined(msgDeFalta)) {
        $window.alert(msgDeFalta);
        return;
      }

      ind.guia.malote = ind.guia.malote
        ? ind.guia.malote
        : false;

      var data = Date.now();

      ind.guia.guardar(data);
      $location.url("/impressao/" + data);
    };

    ind.removerProcesso = function (numero) {
      if (ind.guia.processos.tem(numero)) {
        var fazer = $window.confirm("Certeza?");

        if (fazer) ind.guia.processos.remover(numero);
        return;
      }

      $window.alert("Erro!");
    };
  }
})(window.angular);
