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

    ind.ultimoNumDeGuia = Configuracoes.obter("ultima") || 0;

    ind.adicionarProcesso = function () {
      var tahLimpo = !ind.codigoDeBarras || !ind.codigoDeBarras.trim();
      if (tahLimpo) return $window.alert("Informe algo!");

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

      var faltaAlgo = angular.isDefined(msgDeFalta);
      if (faltaAlgo) return $window.alert(msgDeFalta);

      var nTahEditando = !ind.guia.tahEditando;
      var numeroJahFoiUtilizado = ind.guia.numero <= ind.ultimoNumDeGuia;

      if (nTahEditando && numeroJahFoiUtilizado) {
        var parar = !$window.confirm("Certeza que esse número é valido?");
        if (parar) return;
      }

      if (nTahEditando) Configuracoes.adicionar("ultima", ind.guia.numero);

      var data = Date.now();

      ind.guia.guardar(data);
      $location.url("/impressao/" + data);
    };

    ind.iniciar = function () {
      mesclarGuia();

      // configuracoes

      function mesclarGuia() {
        var parametros = $routeParams;
        var data = parametros.data;
        var aDataFoiInfomada = angular.isDefined(data);

        if (aDataFoiInfomada) {
          var dados = Historico.obter(data);

          ind.guia.numero = dados.numero;
          ind.guia.malote = dados.malote;
          ind.guia.destinatario = dados.destinatario;
          ind.guia.processos.lista = dados.processos;
          ind.guia.tahEditando = true;
        }
      }
    };

    ind.removerProcesso = function (numero) {
      if (ind.guia.processos.tem(numero)) {
        var continuar = $window.confirm("Certeza?");
        if (continuar) return ind.guia.processos.remover(numero);
      }

      $window.alert("Erro!");
    };
  }
})(window.angular);
