;(function (angular) {
  "use strict";

  angular
    .module("app")
    .directive("grProcesso", grProcesso);

  function grProcesso(Processo) {
    return {
      link: link,
      restrict: "E",
      scope: {
        "numero": "<",
        "formatar": "<?",
        "destacar": "<?"
      }
    };

    function link(scope, element, attrs) {
      var numero = scope.numero;
      var formatar = scope.formatar;
      var destacar = scope.destacar;

      if (formatar) numero = Processo.formatar(numero);
      if (destacar) numero = Processo.destacar(numero);

      element.html(numero);
    }
  }
})(window.angular);
