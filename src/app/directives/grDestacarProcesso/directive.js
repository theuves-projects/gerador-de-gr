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

      var classesArray = angular.isArray(classes) ? classes : [];
      var classesNormal = classesArray.join(" ");
      var temClasses = !!classesNormal.trim();

      var regex = /([^0]+\d-\d{2})/;
      var destacar = function (trecho) {
        if (!temClasses) return "<span>"+trecho+"</span>";
        return "<span class=\""+classesNormal+"\">"+trecho+"</span>";
      };

      var destacado = numero.replace(regex, destacar);
      element.html(destacado);
    }
  }
})(window.angular);
