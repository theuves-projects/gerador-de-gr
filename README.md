gerador de guia de remessa
==========================

> um utilitário pessoal.

acesse-o em &lt;https://gerador-de-guia-de-remessa.surge.sh&gt;.

gulp
----

comandos:

* `gulp construir` - construir tudo; em `./build`
* `gulp construir:html-css-e-js` - construir o *html*, *css* e *javascript*
* `gulp construir:templates` - construir [*template cache*](https://goo.gl/31tQvv)
* `gulp injetar` - [injetar](https://goo.gl/R3ju2V) todos os *scripts* e estilos
* `gulp injetar:css` - injetar somente os estilos
* `gulp injetar:js` - injetar somente os *scripts*
* `gulp mover` - mover arquivos para `./build`
* `gulp mover:favicon.ico` - mover `./favicon.ico` para `./build`

npm
---

* `npm run deploy` - publicar
* `npm run open` - abrir `build/index.html`
* `npm run serve` - rodar `src/` (em *localhost:5000*)

favicon
-------

o [ícone](./src/favicon.ico) foi obtido [aqui](https://goo.gl/gYrVSu).

licença
-------

mit
