;(function (angular) {
  "use strict";

  angular
    .module("app")
    .service("Guia", Guia);

  function Guia(Historico) {
    return function Guia() {
      var guia = this;
      ////////////////

      guia.processos = {
        lista: [],
        adicionar: function (numero, ehValido) {
          if (this.tem(numero)) {
            this.aumentarVolume(numero);
            return;
          }

          this.lista.push({
            ehValido: ehValido,
            item: this.lista.length + 1,
            numero: numero,
            volume: 1
          });
        },
        aumentarVolume: function (numero) {
          var processo = this.obter(numero);
          ++processo.volume;
        },
        diminuirVolume: function (numero) {
          var processo = this.obter(numero);
          if (processo.volume > 1) --processo.volume;
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

      guia.guardar = function (data) {
        Historico.adicionar(
          data,
          guia.numero,
          guia.malote,
          guia.destinatario,
          guia.processos.lista,
          !!guia.tahEditando
        );
      };

      guia.tahVazia = function () {
        var semNumero = !guia.numero;
        var semMalote = !guia.numero;
        var semDestinatario = !guia.destinatario;
        var semProcessos = guia.processos.tahVazio();

        return semNumero
          && semMalote
          && semDestinatario
          && semProcessos;
      };
    }
  }
})(window.angular);
