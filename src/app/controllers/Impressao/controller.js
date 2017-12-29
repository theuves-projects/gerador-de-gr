;(function (angular) {
  "use strict";

  angular
    .module("app")
    .controller("Impressao", Impressao);

  function Impressao(
      $location,
      $routeParams
    , $window
    , Configuracoes
    , Guia
    , Historico
  ) {
    var impr = this;
    ////////////////

    impr.data = $routeParams.data;

    impr.usuario = Configuracoes.obter("usuario");

    impr.iniciar = function () {
      verificarExistencia();
      mesclarGuia();

      // configurações

      function verificarExistencia() {
        var nTemDaddos = !Historico.obter(impr.data);

        if (nTemDaddos) {
          $window.alert("Guia inexistente!");
          $location.url("/");
          return;
        }
      }

      function mesclarGuia() {
        var dados = Historico.obter(impr.data);
        angular.extend(impr, dados);
      }
    };

    impr.imprimir = function () {
      $window.print();
    };
  }
})(window.angular);
