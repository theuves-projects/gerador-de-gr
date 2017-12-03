;(function () {
  "use strict";

  angular
    .module("adicionar")
    .service("Malote", Malote);

  function Malote() {

    // funções
    this.percurso = percurso;
    this.numero = numero;
    this.destinatario = destinatario;

    ///

    var percursos = {

      /**
       * amambai
       * =======
       */
      "305764": {
        cidade: "amambai",
        vara: "vara do trabalho"
      },
      "253427": {
        cidade: "amambai",
        vara: "1ª vara estadual"
      },
      "253428": {
        cidade: "amambai",
        vara: "2ª vara estadual"
      },

      /**
       * bela vista
       * ==========
       */
      "280409": {
        cidade: "bela vista",
        vara: "vara estadual"
      },

      /**
       * caarapó
       * =======
       */
      "245810": {
        cidade: "caarapó",
        vara: "vara estadual"
      },

      /**
       * deodápolis
       * ==========
       */
      "245815": {
        cidade: "deodápolis",
        vara: "vara estadual"
      },

      /**
       * dourados
       * ========
       */
      "305753": {
        cidade: "dourados",
        vara: "1ª vara do trabalho"
      },
      "305755": {
        cidade: "dourados",
        vara: "2ª vara do trabalho"
      },

      /**
       * eldorado
       * ========
       */
      "245808": {
        cidade: "eldourado",
        vara: "vara estadual"
      },

      /**
       * fátima do sul
       * =============
       */
      "305769": {
        cidade: "fátima do sul",
        vara: "vara do trabalho"
      },
      "245793": {
        cidade: "fátima do sul",
        vara: "1ª vara estadual"
      },
      "245794": {
        cidade: "fátima do sul",
        vara: "2ª vara estadual"
      },

      /**
       * iguatemi
       * ========
       */
      "245809": {
        cidade: "iguatemi",
        vara: "vara estadual"
      },
      "245812": {
        cidade: "itaporã",
        vara: "vara estadual"
      },

      /**
       * itaquiraí
       * =========
       */
      "246911": {
        cidade: "itaquiraí",
        vara: "vara estadual"
      },

      /**
       * ivinhema
       * ========
       */
      "245795": {
        cidade: "ivinhema",
        vara: "1ª vara estadual"
      },
      "245796": {
        cidade: "ivinhema",
        vara: "2ª vara estadual"
      },

      /**
       * jardim
       * ======
       */
      "305759": {
        cidade: "jardim",
        vara: "vara do trabalho"
      },
      "245813": {
        cidade: "jardim",
        vara: "1ª vara estadual"
      },
      "245814": {
        cidade: "jardim",
        vara: "2ª vara estadual"
      },

      /**
       * maracaju
       * ========
       */
      "245798": {
        cidade: "maracaju",
        vara: "1ª vara estadual"
      },
      "245799": {
        cidade: "maracaju",
        vara: "2ª vara estadual"
      },

      /**
       * mundo novo
       * ==========
       */
      "305766": {
        cidade: "mundo novo",
        vara: "vara do trabalho"
      },
      "245807": {
        cidade: "mundo novo",
        vara: "vara estadual"
      },

      /**
       * naviraí
       * =======
       */
      "305762": {
        cidade: "naviraí",
        vara: "vara do trabalho"
      },
      "10377912": {
        cidade: "naviraí",
        vara: "2ª vara federal"
      },
      "245797": {
        cidade: "naviraí",
        vara: "2ª vara federal"
      },
      "245802": {
        cidade: "naviraí",
        vara: "1ª vara estadual"
      },
      "245803": {
        cidade: "naviraí",
        vara: "2ª vara estadual"
      },

      /**
       * nova alvorada do sul
       * ====================
       */
      "245800": {
        cidade: "nova alvorada do sul",
        vara: "vara estadual"
      },

      /**
       * nova andradina
       * ==============
       */
      "305756": {
        cidade: "nova andradina",
        vara: "vara do trabalho"
      },
      "245816": {
        cidade: "nova andradina",
        vara: "1ª vara estadual"
      },
      "245817": {
        cidade: "nova andradina",
        vara: "2ª vara estadual"
      },

      /**
       * ponta porã
       * ==========
       */
      "331870": {
        cidade: "ponta porã",
        vara: "1ª vara federal"
      },
      "10377913": {
        cidade: "ponta porã",
        vara: "1ª vara federal"
      },
      "10377914": {
        cidade: "ponta porã",
        vara: "2ª vara federal"
      },
      "305761": {
        cidade: "ponta porã",
        vara: "vara do trabalho"
      },

      /**
       * rio brilhante
       * =============
       */
      "245801": {
        cidade: "rio brilhante",
        vara: "vara estadual"
      }
    };

    /// obter o percurso do malote
    function percurso(codigoDeBarras) {
      return codigoDeBarras.replace(/^\d{13}(\d{12}).*/, "$1");
    }

    // obter o número do malote
    function numero(codigoDeBarras) {
      return codigoDeBarras.replace(/^.*(\d{5})$/, "$1");
    }

    // obter o destinatário a partir do número do percurso
    function destinatario(percurso) {
      percurso = percursos[parseInt(percurso)];

      if (percurso) {
        return percurso.vara + " de " + percurso.cidade + "/ms";
      }

      return false;
    }
  }
})();
