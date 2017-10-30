;(function () {
  "use strict";

  angular
    .module("services", [])
    .service("Processo", Processo)
  ;

  /**
   * funções pra manipular números de um processo.
   */
  function Processo() {
    var vm = this;

    /**
     * pra verificar é um número de processo.
     * obs.: não valida.
     */
    vm.eh = function (numero) {
      return /^\d{20}$/
        .test(
          numero.trim()
        )
      ;
    };

    /**
     * pra formatar um número de processo.
     */
    vm.formatar = function (numero) {
      return numero
        .toString()
        .trim()
        .replace(
            /^(\d{7})(\d{2})(\d{4})(\d{3})(\d{4})$/
          , "$1-$2.$3.$4.$5"
        )
      ;
    };
  }
})();
