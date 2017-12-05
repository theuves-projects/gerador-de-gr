;(function () {
  "use strict";

  angular
    .module("app")
    .service("Tela", Tela);

  Tela.$inject = ["$window"];

  function Tela($window) {
    var tel = this;
    ///////////////

    tel.alertar = function (titulo, mensagem) {
      if (angular.isArray(mensagem)) {
        mensagem = mensagem.join("");
      }

      return $window.alert("[" + titulo + "]\n\n" + mensagem);
    };

    tel.perguntar = function (titulo, mensagem) {
      if (angular.isArray(mensagem)) {
        mensagem = mensagem.join("");
      }

      return $window.prompt("[" + titulo + "]\n\n" + mensagem);
    };

    tel.confirmar = function (titulo, mensagem) {
      if (angular.isArray(mensagem)) {
        mensagem = mensagem.join("");
      }

      return $window.confirm("[" + titulo + "]\n\n" + mensagem);
    };
  }
})();
