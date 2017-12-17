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
      adicionar: function (numero) {
        if (this.tem(numero)) {
          this.aumentarVolume(numero);
        } else {
          this.lista.push({
            item: this.lista.length + 1,
            numero: numero,
            volume: 1
          });
        }
      },
      aumentarVolume: function (numero) {
        this.lista.forEach(function (processo, indice) {
          if (processo.numero === numero) {
            ++this.lista[indice].volume;
          }
        }.bind(this));
      },
      diminuirVolume: function (numero) {
        this.lista.forEach(function (processo, indice) {
          if (processo.numero === numero && this.lista[indice].volume > 1) {
            --this.lista[indice].volume;
          }
        }.bind(this));
      },
      obter: function (numero) {
        return this.lista.find(function (processo) {
          if (processo.numero === numero) return processo;
        });
      },
      remover: function (numero) {
        this.lista = this.lista.filter(function (processo) {
          return processo.numero !== numero;
        });

        this.lista = this.lista.map(function (processo, indice) {
          processo.item = ++indice;

          return processo;
        });
      },
      tahVazio: function () {
        return angular.equals(this.lista, []);
      },
      tem: function (numero) {
        return this.lista.some(function (processo) {
          return processo.numero === numero;
        });
      }
    };

    guia.tahVazia = function () {

      // sem processos, sem guia.
      return guia.processos.lista.length === 0;
    };
  }
})(this.angular);
