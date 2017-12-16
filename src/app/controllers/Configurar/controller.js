;(function () {
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
      salvar: function () {
        Configuracoes.adicionar("usuario", angular.uppercase(this.nome));

        $window.alert("Salvo!");
        $window.location.reload();
      }
    };

    conf.destinatarios = {
      novo: "",
      lista: Destinatarios.obter(),
      adicionar: function (evento)  {
        if (evento.key !== "Enter") return;

        if (angular.equals(this.novo.trim(), "")) {
          $window.alert("Informe algo!");

          return;
        }

        if (this.tem(this.novo)) {
          $window.alert("O destinatário informado já existe!");

          return;
        }

        this.lista.push(angular.uppercase(this.novo));
        this.novo = "";
      },
      remover: function (indice) {
        if ($window.confirm("Tem certeza?")) {
          delete this.lista[indice];

          this.lista = this.lista.filter(function (item) {
            return item;
          });
        }
      },
      salvar: function () {
        Destinatarios.adicionar(this.lista);

        $window.alert("Salvo!");
        $window.location.reload();
      },
      tem: function (destinatario) {
        return this.lista.includes(angular.uppercase(destinatario));
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
})();
