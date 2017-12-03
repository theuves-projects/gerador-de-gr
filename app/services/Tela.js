;(function () {
  "use strict";

  angular
    .module("app")
    .service("Tela", Tela);

  Tela.$inject = ["$window"];

  function Tela($window) {
    var tela = this;
    ////////////////

    tela.alertar = alertar;
    tela.perguntar = perguntar;
    tela.confirmar = confirmar;

    ///

    function alertar(titulo, mensagem) {
      return $window.alert("[" + titulo + "]\n\n" + mensagem);
    }

    function perguntar(titulo, mensagem) {
      return $window.prompt("[" + titulo + "]\n\n" + mensagem);
    }

    function confirmar(titulo, mensagem) {
      return $window.confirm("[" + titulo + "]\n\n" + mensagem);
    }
  }
})();
