;(function () {
  "use strict";

  angular
    .module("app", [

      /**
       * específicos
       */
        "indice"
      , "imprimir"

      /**
       * globais
       */
       , "app.services"

      /**
       * externos
       */
      , "ngAnimate"
      , "ngRoute"
    ])
  ;
})();
