;(function (angular) {
  "use strict";

  angular
    .module("app")
    .controller("Indice", Indice);

  function Indice(
      $location
    , $window
    , $routeParams
    , Configuracoes
    , Destinatarios
    , Guia
    , Historico
    , Processo
  ) {
    var ind = this;
    ///////////////

    ind.destinatarios = Destinatarios.obter();

    ind.guia = new Guia.constructor(Historico);

    ind.tahEditando = false;

    ind.ultimoNumDeGuia = Configuracoes.obter("ultima") || 0;

    ind.adicionarProcesso = function () {
      var tahLimpo = !ind.codigoDeBarras || !ind.codigoDeBarras.trim();

      if (tahLimpo) {
        $window.alert("Informe algo!");
        return;
      }

      var ehValido = Processo.ehValido(ind.codigoDeBarras);

      ind.guia.processos.adicionar(ind.codigoDeBarras, ehValido);
      ind.codigoDeBarras = undefined;
    };

    ind.gerarGuia = function () {
      var faltaNumero = angular.isUndefined(ind.guia.numero);
      var faltaDestinatario = angular.isUndefined(ind.guia.destinatario);
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

      if (!ind.tahEditando && ind.guia.numero <= ind.ultimoNumDeGuia) {
        var fazer = $window.confirm("Certeza que essa guia é valida?");
        if (!fazer) return;
      }

      Configuracoes.adicionar("ultima", ind.guia.numero);

      var data = Date.now();

      ind.guia.guardar(data);
      $location.url("/impressao/" + data);
    };

    ind.iniciar = function () {
      mesclarGuia();

      // configurações
      // -------------

      function mesclarGuia() {
        var parametros = $routeParams;

        if ("data" in parametros) {
          var data = parametros.data;
          var dados = Historico.obter(data);

          ind.guia.numero = dados.numero;
          ind.guia.malote = dados.malote;
          ind.guia.destinatario = dados.destinatario;
          ind.guia.processos.lista = dados.processos;

          ind.tahEditando = true;
        }
      }
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
