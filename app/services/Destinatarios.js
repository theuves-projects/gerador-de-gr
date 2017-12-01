;(function () {
  "use strict";

  (angular)
  .module("app")
  .service("Destinatarios", Destinatarios);

  function Destinatarios() {

    if (!localStorage.getItem("destinatarios")) {
      var lista = [

        /**
         * amambai
         * =======
         */
        "vara estadual de amambai/ms",
        "vara do trabalho de amambai/ms",

        /**
         * angélica
         * ========
         */
        "vara estadual de angélica/ms",
        "vara do trabalho de angélica/ms",

        /**
         * bela vista
         * ==========
         */
        "vara estadual de bela vista/ms",
        "vara do trabalho de bela vista/ms",

        /**
         * batayporã
         * =========
         */
        "vara estadual de batayporã/ms",
        "vara do trabalho de batayporã/ms",

        /**
         * caarapó
         * =======
         */
        "vara estadual de caarapó/ms",
        "vara do trabalho de caarapó/ms",

        /**
         * deodápolis
         * ==========
         */
        "vara estadual de deodápolis/ms",
        "vara do trabalho de deodápolis/ms",

        /**
         * dourados
         * ========
         */
        "1ª vara federal de dourados/ms",
        "2ª vara federal de dourados/ms",
        "1ª vara do trabalho de dourados/ms",
        "2ª vara do trabalho de dourados/ms",
        "3ª vara estadual de dourados/ms",

        /**
         * eldorado
         * ========
         */
        "vara estadual de eldorado/ms",
        "vara do trabalho de eldorado/ms",

        /**
         * fátima do sul
         * =============
         */
        "vara única de fátima do sul/ms",
        "vara estadual de fátima do sul/ms",
        "vara do trabalho de fátima do sul/ms",

        /**
         * glória de dourados
         * ==================
         */
        "vara estadual de glória de dourados/ms",
        "vara do trabalho de glória de dourados/ms",

        /**
         * iguatemi
         * ========
         */
        "vara estadual de iguatemi/ms",
        "vara do trabalho de iguatemi/ms",

        /**
         * itaporã
         * =======
         */
        "vara estadual de itaporã/ms",
        "vara do trabalho de itaporã/ms",

        /**
         * itaquiraí
         * =========
         */
        "vara estadual de itaquiraí/ms",
        "vara do trabalho de itaquiraí/ms",

        /**
         * ivinhema
         * ========
         */
        "vara estadual de ivinhema/ms",
        "vara do trabalho de ivinhema/ms",

        /**
         * jardim
         * ======
         */
        "vara estadual de jardim/ms",
        "vara do trabalho de jardim/ms",

        /**
         * maracaju
         * ========
         */
        "vara estadual de maracaju/ms",
        "vara do trabalho de maracaju/ms",

        /**
         * mundo novo
         * ==========
         */
        "vara estadual de mundo novo/ms",
        "vara do trabalho de mundo novo/ms",

        /**
         * naviraí
         * =======
         */
        "1ª vara federal de naviraí/ms",
        "2ª vara federal de naviraí/ms",
        "vara estadual de naviraí/ms",
        "vara do trabalho de naviraí/ms",

        /**
         * nova alvorada do sul
         * ====================
         */
        "vara estadual de nova alvorada do sul/ms",
        "vara do trabalho de nova alvorada do sul/ms",

        /**
         * nova andradina
         * ==============
         */
        "1ª vara estadual de nova andradina/ms",
        "2ª vara estadual de nova andradina/ms",
        "vara do trabalho de nova andradina/ms",

        /**
         * ponta porã
         * ==========
         */
        "1ª vara do trabalho de ponta porã/ms",
        "2ª vara do trabalho de ponta porã/ms",
        "1ª vara federal de ponta porã/ms",
        "2ª vara federal de ponta porã/ms",
        "vara estadual de ponta porã/ms",

        /**
         * rio brilhante
         * =============
         */
        "vara estadual de rio brilhante/ms",
        "vara do trabalho de rio brilhante/ms",

        /**
         * sete quedas
         * ===========
         */
        "vara estadual de sete quedas/ms",
        "vara do trabalho de sete quedas/ms"
      ];

      var listaEmJson = angular.toJson(lista);

      localStorage.setItem("destinatarios", listaEmJson);
    }

    function obter() {
      var listaEmJson = localStorage.getItem("destinatarios");
      var lista = angular.fromJson(listaEmJson);

      return lista;
    }

    function salvar(destinatarios) {
      var listaEmJson = angular.toJson(destinatarios);

      localStorage.setItem("destinatarios", listaEmJson);
    }

    this.obter = obter;
    this.salvar = salvar;
  }
})();
