;(function (angular) {
  "use strict";

  angular
    .module("app")
    .component("grCabecalho", config());

  function config() {
    return {
      bindings: {
        "titulo": "@",
        "botaoPrincipal": "@",
        "botaoPrincipalFa": "@",
        "botaoPrincipalClick": "&"
      },
      controller: Cabecalho,
      controllerAs: "cab",
      templateUrl: "app/components/grCabecalho/template.html"
    };
  }

  function Cabecalho($location, $window) {
    var cab = this;
    ///////////////

    cab.criarNovo = function criarNovo() {
      var fazer = $window.confirm("Certeza?");
      if (fazer) $window.location.reload();
    };

    cab.verHistorico = function verHistorico() {
      var fazer = $window.confirm("Dados serão perdidos.\n\nTem certeza?");
      if (fazer) $location.url("/historico");
    };

    cab.verConfiguracoes = function verConfiguracoes() {
      var fazer = $window.confirm("Dados serão perdidos.\n\nTem certeza?");
      if (fazer) $location.url("/configuracoes");
    };
  }
})(window.angular);
