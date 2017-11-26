;(function () {
  "use strict";

  (angular)
  .module("app", [

    // específicos
      "indice"
    , "configurar"
    , "imprimir"

    // globais
     , "app.services"

    // externos
    , "ngAnimate"
    , "ngRoute"
  ]);
})();
