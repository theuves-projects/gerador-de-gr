;(function () {
  "use strict";

  angular
    .module("app")
    .service("Tela", Tela);

  Tela.$inject = ["$window"];

  function Tela($window) {
    var tela = this;
    ////////////////

    tela.alertar = function (titulo, mensagem) {
      if (angular.isArray(mensagem)) {
        mensagem = mensagem.join("");
      }

      return $window.alert("[" + titulo + "]\n\n" + mensagem);
    };

    tela.perguntar = function (titulo, mensagem) {
      if (angular.isArray(mensagem)) {
        mensagem = mensagem.join("");
      }

      return $window.prompt("[" + titulo + "]\n\n" + mensagem);
    };

    tela.confirmar = function (titulo, mensagem) {
      if (angular.isArray(mensagem)) {
        mensagem = mensagem.join("");
      }

      return $window.confirm("[" + titulo + "]\n\n" + mensagem);
    };
  }
})();
