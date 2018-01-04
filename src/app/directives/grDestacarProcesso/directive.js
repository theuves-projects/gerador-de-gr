;(function (angular) {
  "use strict";

  angular
    .module("app")
    .directive("grDestacarProcesso", grDestacarProcesso);

  function grDestacarProcesso() {
    return {
      link: link,
      restrict: "E",
      scope: {
        "numero": "<",
        "classes": "<?"
      }
    };

    function link(scope, element) {
      var numero = scope.numero;
      var classes = scope.classes;

      var classesEmArr = angular.isArray(classes) ? classes : [];
      var classesNormal = classesEmArr.join(" ");
      var temClasses = !!classesNormal.trim();

      var REGEX = /([^0]\d+-\d{2})/;

      var destacado = numero.replace(REGEX, function (trecho) {
        if (!temClasses) return "<span>" + trecho + "</span>";
        return "<span class=\"" + classesNormal + "\">" + trecho + "</span>";
      });

      element.html(destacado);
    }
  }
})(window.angular);
