;(function () {
  "use strict";

  angular
    .module("app")
    .service("Processos", Processos);

  function Processos() {
    var processos = this;
    /////////////////////

    processos.lista = {};

    processos.adicionar = function (numero) {
      var temNumero = processos.lista[numero];

      if (temNumero) {
        aumentarVolume(numero);
      } else {
        processos.lista[numero] = {
            item: Object.keys(processos.lista).length + 1
          , numero: numero
          , volume: 1
        };
      }
    };

    processos.aumentarVolume = function (numero) {
      processos.lista[numero].volume = processos.lista[numero].volume + 1;
    };

    processos.diminuirVolume = function (numero) {
      processos.lista[numero].volume = processos.lista[numero].volume - 1;
    };

    processos.obter = function (numero) {
      if (numero) {
        return processos.lista[numero];
      } else {
        return Object.values(processos.lista);
      }
    };

    processos.remover = function (numero) {
      delete processos.lista[numero];

      // normalizar o número do item
      Object.keys(processos.lista).forEach(function (num, item) {
        processos.lista[num].item = item + 1;
      });
    };
  }
})();
