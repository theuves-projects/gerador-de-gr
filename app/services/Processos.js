;(function () {
  "use strict";

  angular
    .module("app")
    .service("Processos", Processos);

  function Processos() {
    var proc = this;
    ////////////////

    proc.lista = {};

    proc.adicionar = function (numero) {
      var temNumero = proc.lista[numero];

      if (temNumero) {
        proc.aumentarVolume(numero);
      } else {
        proc.lista[numero] = {
            item: Object.keys(proc.lista).length + 1
          , numero: numero
          , volume: 1
        };
      }
    };

    proc.aumentarVolume = function (numero) {
      proc.lista[numero].volume = proc.lista[numero].volume + 1;
    };

    proc.diminuirVolume = function (numero) {
      proc.lista[numero].volume = proc.lista[numero].volume - 1;
    };

    proc.obter = function (numero) {
      if (numero) {
        return proc.lista[numero];
      } else {
        return Object.values(proc.lista);
      }
    };

    proc.remover = function (numero) {
      delete proc.lista[numero];

      // normalizar o número do item
      Object.keys(proc.lista).forEach(function (num, item) {
        proc.lista[num].item = item + 1;
      });
    };
  }
})();
