;(function (angular) {
  "use strict";

  angular
    .module("app")
    .controller("Configurar", Configurar);

  function Configurar(
      $window
    , $location
    , $anchorScroll
    , Configuracoes
    , Destinatarios
  ) {
    var conf = this;
    ////////////////

    conf.usuario = {
      nome: Configuracoes.obter("usuario"),
      salvar: function salvar() {
        var nomeEmMaiusculo = this.nome.toUpperCase();

        Configuracoes.adicionar("usuario", nomeEmMaiusculo);

        $window.alert("Salvo!");
        $window.location.reload();
      }
    };

    conf.destinatarios = {
      novo: "",
      lista: Destinatarios.obter(),
      adicionar: function adicionar(evento)  {
        if (evento.code === "Enter") {
          if (angular.equals(this.novo.trim(), "")) {
            $window.alert("Informe algo!");
            return;
          }

          var destEmMaiusculo = this.novo.toUpperCase();

          if (this.tem(destEmMaiusculo)) {
            $window.alert("O destinatário informado já existe!");
            return;
          }

          this.lista.push(destEmMaiusculo);
          this.limpar();
          return;
        }
      },
      limpar: function limpar() {
        this.novo = "";
      },
      remover: function remover(indice) {
        if ($window.confirm("Tem certeza?")) {
          delete this.lista[indice];

          this.lista = this.lista.filter(function (item) {
            return item;
          });
        }
      },
      salvar: function salvar() {
        Destinatarios.adicionar(this.lista);

        $window.alert("Salvo!");
        $window.location.reload();
      },
      tem: function tem(destinatario) {
        return this.lista.includes(destinatario);
      }
    };

    conf.iniciar = function () {
      $anchorScroll.yOffset = 10;
      $anchorScroll();
    };

    conf.voltar = function() {
      $location.hash("");
      $location.path("/");
    };
  }
})(this.angular);
