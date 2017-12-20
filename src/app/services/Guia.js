;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Guia", Guia);

  function Guia() {
    var guia = this;
    ////////////////

    guia.numero = undefined;

    guia.malote = {
      numero: undefined,
      vai: true
    };

    guia.destinatario = undefined;

    guia.processos = {
      lista: [],
      adicionar: function adicionar(numero, ehValido) {
        if (this.tem(numero)) {
          this.aumentarVolume(numero);
        } else {
          this.lista.push({
            ehValido: ehValido,
            item: this.lista.length + 1,
            numero: numero,
            volume: 1
          });
        }
      },
      aumentarVolume: function aumentarVolume(numero) {
        var processo = this.obter(numero);
        ++processo.volume;
      },
      diminuirVolume: function diminuirVolume(numero) {
        var processo = this.obter(numero);
      	if (processo.volume > 1) --processo.volume;
      },
      obter: function obter(numero) {
        return this.lista.find(function (processo) {
          if (processo.numero === numero) return processo;
        });
      },
      remover: function remover(numero) {
        this.lista = this.lista.filter(function (processo) {
          return processo.numero !== numero;
        });

        this.lista = this.lista.map(function (processo, indice) {
          processo.item = ++indice;

          return processo;
        });
      },
      tahVazio: function tahVazio() {
        return angular.equals(this.lista, []);
      },
      tem: function tem(numero) {
        return this.lista.some(function (processo) {
          return processo.numero === numero;
        });
      }
    };

    guia.tahVazia = function tahVazia() {
      return guia.processos.lista.length === 0;
    };
  }
})(window.angular);
