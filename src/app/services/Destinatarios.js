;(function () {
  "use strict";

  angular
    .module("app")
    .service("Destinatarios", Destinatarios);

  function Destinatarios(Configuracoes) {
    var dest = this;
    ////////////////

    dest.iniciar = function () {
      var listaDeDestinatarios = [

        /**
         * amambai
         * =======
         */
        "VARA ESTADUAL DE AMAMBAI/MS",
        "VARA DO TRABALHO DE AMAMBAI/MS",

        /**
         * angélica
         * ========
         */
        "VARA ESTADUAL DE ANGÉLICA/MS",
        "VARA DO TRABALHO DE ANGÉLICA/MS",

        /**
         * bela vista
         * ==========
         */
        "VARA ESTADUAL DE BELA VISTA/MS",
        "VARA DO TRABALHO DE BELA VISTA/MS",

        /**
         * batayporã
         * =========
         */
        "VARA ESTADUAL DE BATAYPORÃ/MS",
        "VARA DO TRABALHO DE BATAYPORÃ/MS",

        /**
         * caarapó
         * =======
         */
        "VARA ESTADUAL DE CAARAPÓ/MS",
        "VARA DO TRABALHO DE CAARAPÓ/MS",

        /**
         * deodápolis
         * ==========
         */
        "VARA ESTADUAL DE DEODÁPOLIS/MS",
        "VARA DO TRABALHO DE DEODÁPOLIS/MS",

        /**
         * dourados
         * ========
         */
        "1ª VARA FEDERAL DE DOURADOS/MS",
        "2ª VARA FEDERAL DE DOURADOS/MS",
        "1ª VARA DO TRABALHO DE DOURADOS/MS",
        "2ª VARA DO TRABALHO DE DOURADOS/MS",
        "3ª VARA ESTADUAL DE DOURADOS/MS",

        /**
         * eldorado
         * ========
         */
        "VARA ESTADUAL DE ELDORADO/MS",
        "VARA DO TRABALHO DE ELDORADO/MS",

        /**
         * fátima do sul
         * =============
         */
        "VARA ÚNICA DE FÁTIMA DO SUL/MS",
        "VARA ESTADUAL DE FÁTIMA DO SUL/MS",
        "VARA DO TRABALHO DE FÁTIMA DO SUL/MS",

        /**
         * glória de dourados
         * ==================
         */
        "VARA ESTADUAL DE GLÓRIA DE DOURADOS/MS",
        "VARA DO TRABALHO DE GLÓRIA DE DOURADOS/MS",

        /**
         * iguatemi
         * ========
         */
        "VARA ESTADUAL DE IGUATEMI/MS",
        "VARA DO TRABALHO DE IGUATEMI/MS",

        /**
         * itaporã
         * =======
         */
        "VARA ESTADUAL DE ITAPORÃ/MS",
        "VARA DO TRABALHO DE ITAPORÃ/MS",

        /**
         * itaquiraí
         * =========
         */
        "VARA ESTADUAL DE ITAQUIRAÍ/MS",
        "VARA DO TRABALHO DE ITAQUIRAÍ/MS",

        /**
         * ivinhema
         * ========
         */
        "VARA ESTADUAL DE IVINHEMA/MS",
        "VARA DO TRABALHO DE IVINHEMA/MS",

        /**
         * jardim
         * ======
         */
        "VARA ESTADUAL DE JARDIM/MS",
        "VARA DO TRABALHO DE JARDIM/MS",

        /**
         * maracaju
         * ========
         */
        "VARA ESTADUAL DE MARACAJU/MS",
        "VARA DO TRABALHO DE MARACAJU/MS",

        /**
         * mundo novo
         * ==========
         */
        "VARA ESTADUAL DE MUNDO NOVO/MS",
        "VARA DO TRABALHO DE MUNDO NOVO/MS",

        /**
         * naviraí
         * =======
         */
        "1ª VARA FEDERAL DE NAVIRAÍ/MS",
        "2ª VARA FEDERAL DE NAVIRAÍ/MS",
        "VARA ESTADUAL DE NAVIRAÍ/MS",
        "VARA DO TRABALHO DE NAVIRAÍ/MS",

        /**
         * nova alvorada do sul
         * ====================
         */
        "VARA ESTADUAL DE NOVA ALVORADA DO SUL/MS",
        "VARA DO TRABALHO DE NOVA ALVORADA DO SUL/MS",

        /**
         * nova andradina
         * ==============
         */
        "1ª VARA ESTADUAL DE NOVA ANDRADINA/MS",
        "2ª VARA ESTADUAL DE NOVA ANDRADINA/MS",
        "VARA DO TRABALHO DE NOVA ANDRADINA/MS",

        /**
         * ponta porã
         * ==========
         */
        "1ª VARA DO TRABALHO DE PONTA PORÃ/MS",
        "2ª VARA DO TRABALHO DE PONTA PORÃ/MS",
        "1ª VARA FEDERAL DE PONTA PORÃ/MS",
        "2ª VARA FEDERAL DE PONTA PORÃ/MS",
        "VARA ESTADUAL DE PONTA PORÃ/MS",

        /**
         * rio brilhante
         * =============
         */
        "VARA ESTADUAL DE RIO BRILHANTE/MS",
        "VARA DO TRABALHO DE RIO BRILHANTE/MS",

        /**
         * sete quedas
         * ===========
         */
        "VARA ESTADUAL DE SETE QUEDAS/MS",
        "VARA DO TRABALHO DE SETE QUEDAS/MS"
      ];

      Configuracoes.adicionar("listaDeDestinatarios", listaDeDestinatarios);
    }

    dest.tem = function (destinatario) {
      var lista = dest.obter();

      return lista.includes(destinatario.toUpperCase());
    }

    dest.obter = function () {
      var listaEmJson = localStorage.getItem("listaDeDestinatarios");
      var lista = angular.fromJson(listaEmJson);

      return lista;
    }

    dest.salvar = function (destinatarios) {
      var listaEmJson = angular.toJson(destinatarios);

      localStorage.setItem("listaDeDestinatarios", listaEmJson);
    }
  }
})();
