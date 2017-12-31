gerador de guia de remessa
==========================

> um utilitário pessoal.

acesse-o em &lt;https://gerador-de-guia-de-remessa.surge.sh&gt;.

`gulp`
------

* `construir` - construir tudo (em `./build`)
  * `html-css-e-js` - construir o *html*, *css* e *javascript*
  * `templates` - construir [*template cache*](https://goo.gl/31tQvv)
* `injetar` - [injetar](https://goo.gl/R3ju2V) todos os *scripts* e estilos
  * `css` - injetar somente os estilos
  * `js` - injetar somente os *scripts*
* `mover` - mover arquivos para `./build`
  * `favicon.ico` - mover `./favicon.ico` para `./build`

*os subcomandos são separados por `:`*

`npm run`
---------

* `deploy` - publicar
* `open` - abrir `build/index.html`
* `serve` - rodar `src/` (em [localhost:5000](http://localhost:5000))

favicon
-------

o [ícone](./src/favicon.ico) foi obtido [aqui](https://goo.gl/gYrVSu).

licença
-------

mit
