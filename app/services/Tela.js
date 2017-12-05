;(function () {
  "use strict";

  angular
    .module("app")
    .service("Tela", Tela);

  Tela.$inject = ["$window"];

  function Tela($window) {
    this.alertar = function (titulo, mensagem) {
      return $window.alert("[" + titulo + "]\n\n" + mensagem);
    };

    this.perguntar = function (titulo, mensagem) {
      return $window.prompt("[" + titulo + "]\n\n" + mensagem);
    };

    this.confirmar = function (titulo, mensagem) {
      return $window.confirm("[" + titulo + "]\n\n" + mensagem);
    };
  }
})();
