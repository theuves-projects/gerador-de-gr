;(function () {
  "use strict";

  angular
    .module("app")
    .service("Processos", Processos);

  function Processos() {
    var processos = this;
    /////////////////////

    processos.adicionar = adicionar;
    processos.aumentarVolume = aumentarVolume;
    processos.diminuirVolume = diminuirVolume;
    processos.obter = obter;
    processos.remover = remover;

    ///

    var lista = {};

    function adicionar(numero) {
      var temNumero = lista[numero];

      if (temNumero) {
        aumentarVolume(numero);
      } else {
        lista[numero] = {
            item: Object.keys(lista).length + 1
          , numero: numero
          , volume: 1
        };
      }
    }

    function aumentarVolume(numero) {
      lista[numero].volume = lista[numero].volume + 1;
    }

    function diminuirVolume(numero) {
      lista[numero].volume = lista[numero].volume - 1;
    }

    function obter(numero) {
      if (numero) {
        return lista[numero];
      } else {
        return Object.values(lista);
      }
    }

    function remover(numero) {
      delete lista[numero];

      // normalizar o número do item
      Object.keys(lista).forEach(function (num, item) {
        lista[num].item = item + 1;
      });
    }
  }
})();
