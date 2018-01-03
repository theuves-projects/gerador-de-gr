;(function (angular) {
  "use strict";

  angular
    .module("app")
    .controller("Impressao", Impressao);

  function Impressao(
    $location,
    $routeParams,
    $window,
    Configuracoes,
    Guia,
    Historico
  ) {
    var impr = this;
    ////////////////

    impr._iniciar = function () {
      var data = impr.data;
      var dados = Historico.obter(data);
      var temDados = !!dados;

      if (!temDados) {
        $window.alert("Guia inexistente!");
        $location.url("/");

        return;
      }

      angular.extend(impr, dados);
    };

    impr.data = $routeParams.data;

    impr.usuario = Configuracoes.obter("usuario");

    impr.imprimir = function () {
      $window.print();
    };
  }
})(window.angular);
