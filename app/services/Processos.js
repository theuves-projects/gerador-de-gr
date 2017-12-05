;(function () {
  "use strict";

  angular
    .module("app")
    .service("Processos", Processos);

  function Processos() {
    this.lista = {};

    this.adicionar = function (numero) {
      var temNumero = this.lista[numero];

      if (temNumero) {
        aumentarVolume(numero);
      } else {
        this.lista[numero] = {
            item: Object.keys(this.lista).length + 1
          , numero: numero
          , volume: 1
        };
      }
    };

    this.aumentarVolume = function (numero) {
      this.lista[numero].volume = this.lista[numero].volume + 1;
    };

    this.diminuirVolume = function (numero) {
      this.lista[numero].volume = this.lista[numero].volume - 1;
    };

    this.obter = function (numero) {
      if (numero) {
        return this.lista[numero];
      } else {
        return Object.values(this.lista);
      }
    };

    this.remover = function (numero) {
      delete this.lista[numero];

      // normalizar o número do item
      Object.keys(this.lista).forEach(function (num, item) {
        this.lista[num].item = item + 1;
      });
    };
  }
})();
