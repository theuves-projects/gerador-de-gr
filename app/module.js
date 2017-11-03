;(function () {
  "use strict";

  angular
    .module("app", [

      /**
       * específicos
       */
        "configurar"
      , "imprimir"

      /**
       * globais
       */
       , "app.services"

      /**
       * externos
       */
      , "ngRoute"
    ])
  ;
})();
