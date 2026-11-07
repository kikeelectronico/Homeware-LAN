# Homeware Docs (Hugo)

Sitio de documentación de Homeware migrado de Docusaurus a Hugo con el tema
[hugo-docs-theme](https://github.com/kikeelectronico/hugo-docs-theme) v0.1.0
(Hugo >= 0.146.0 y Go instalados).

```sh
hugo mod get github.com/kikeelectronico/hugo-docs-theme@v0.1.0   # genera go.sum
hugo server
```

Para probar con una copia local del tema:

```sh
HUGO_MODULE_REPLACEMENTS="github.com/kikeelectronico/hugo-docs-theme -> ../hugo-docs-theme" hugo server
```
