# Cómo contribuir a Open Pixel Art

Hay dos formas de contribuir a este proyecto. Puedes contribuir agregando o cambiando un pixel en el canvas, o puedes hacer una contribución al proyecto en si, por ejemplo agregando tests, actualizando el HTML o la documentación.

Para ambos escenarios la configuración es la misma, pero los pasos para contribuir son diferentes.

## Si nunca has contribuido a código abierto

![decorative banner image for TwilioQuest mission](../twilio-quest-oss-banner.png)

Contribuir a código abierto puede ser intimidante. Por esa misma razón, creamos una misión nueva en [TwilioQuest](https://twil.io/hacktoberfest-quest) que te guiará
paso a paso para crear una contribución a este proyecto. Después de [descargar el juego](https://www.twilio.com/quest/download), podrás elegir la misión y
ésta te guiará a través de todos los pasos necesarios, desde clonar el proyecto hasta crear tu pull request.

¡Disfruta la aventura!

## Requisitos

- Una cuenta de GitHub
- Tener git instalado en tu computador. [Aprende aquí como instalarlo](https://help.github.com/en/articles/set-up-git)
- [Node.js](https://nodejs.org) y un administrador de paquetes como [npm](https://npmjs.com)

## Configurando el proyecto localmente

1. [Crea un fork](https://help.github.com/en/articles/fork-a-repo) de este proyecto
2. Clona el proyecto ejecutando en tu terminal:

```bash
git clone https://github.com/<TU_USUARIO_DE_GITHUB>/open-pixel-art.git
```

3. Instala las dependencias para desarrollar localmente:

```bash
cd open-pixel-art
npm install
```

4. Inicia el servidor local de desarrollo:

```bash
npm start
```

5. Abre tu navegador y anda a http://localhost:8080. Deberías ver el mismo contenido que está en https://open-pixel-art.com, pero esta versión tendrá una grilla para ayudarte a visualizar mejor el canvas y que puedas ubicar tu pixel de manera más sencilla.

## Contribuyendo con un Pixel

Si quieres contribuir con un pixel, deberás modificar el archivo que reside en [`_data/pixels.json`](_data/pixels.json). Este archivo contiene todos los pixeles que están actualmente en el canvas.

Hay dos formas diferentes para contribuir con un pixel:

### Opción 1: Declarar tuyo un pixel existente

Hay algunos pixeles que ya existen en el archivo `pixels.json`, pero en la propiedad `username` tienen un valor de `<UNCLAIMED>`. Esto significa que puedes cambiar ese valor y hacerlos tuyos, y cambiar el color al que tu quieras. Luego de hacer ese cambio, deberás actualizar la propiedad username y cámbiarla por tu usuario de GitHub, que debe ser el mismo con el que abrirás el pull request.

### Opción 2: Crea un pixel nuevo

Para crear un pixel nuevo, agrega una fila nueva al arreglo `data` que esta dentro de `pixels.json`.
Cada nuevo pixel debe ser un objeto que debe contener las siguientes cuatro propiedades:

- `x`: La coordenada x de tu pixel. `0` representa la columna más a la izquierda del canvas.
- `y`: La coordenada y de tu pixel. `0` representa la fila que está más abajo en el canvas.
- `color`: El color de tu pixel, en formato hexadecimal (Ejemplo: #ff0000 para rojo).
- `username`: El usuario de GitHub que usarás para abrir el pull request.

La fila de tu pixel va a tomar en cuenta primero la coordenada `y` y luego la coordenada `x`. Si no estás seguro de tus cambios, puedes hacerlos y ejecutar `npm run format:json` y esto ajustará tu pixel a la posición adecuada.

El cambio final debería verse así (reemplazando dkundel por tu usuario de GitHub):

```diff
{
  "data": [
    {"y": 1, "x": 3, "color": "#F22F46", "username": "twilio-labs"},
+    { "y": 1, "x": 4, "color": "#FFFF00", "username": "dkundel"},
    {"y": 2, "x": 9, "color": "#F22F46", "username": "twilio"},
    ...
  ]
}
```

### Cómo validar tus cambios

Después de hacer el cambio, deberías ver el nuevo pixel al abrir http://localhost:8080 en tu navegador. Si no estás satisfecho con la posición, puedes seguir ajustando los valores `x` e `y` hasta que encuentres el lugar apropiado y si necesitas ajustar el color, puedes hacer lo mismo, pero cambiando la propiedad `color` del objeto.

Finalmente, puedes validar que los cambios estén bien ejecutando los tests y revisando que todos sigan pasando. Puedes hacer esto en una nueva terminal, ejecutando:

```bash
npm test
```

### Creando una rama y guardando tus cambios en un commit

Una vez que estés satisfecho con tus cambios y estén validados, crea una [rama](https://help.github.com/en/articles/about-branches) para que puedas guardar tus cambios.

```bash
git checkout -b add-my-new-pixel
```

Luego, guarda tus cambios haciendo un commit, ejecutando lo siguiente:

```bash
git add _data/pixels.json
git commit -m "feat(pixels): add my new pixel"
```

Esto creará un nuevo commit con el mensaje `feat(pixels): add my new pixel`. Este mensaje de commit se rige por el [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### Cómo subir tus cambios y abrir un Pull Request

Sube tus cambios a GitHub ejecutando en tu consola:

```bash
git push origin add-my-new-pixel
```

Y luego [sigue estas instrucciones](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) para abrir un pull request desde tu fork hacia la rama `master` de github.com/twilio-labs/open-pixel-art.

## Cómo contribuir con otros cambios

Te agradecemos el interés de contribuir a este proyecto con otros cambios. Antes de empezar a trabajar en el código, por favor revisa si existe un [issue en GitHub](https://github.com/twilio-labs/open-pixel-art/issues) para esos cambios. Si no lo hay, por favor abre uno. Y si ya existe uno, deja un comentario para que sepamos que estás trabajando en ese cambio.

Después de hacer tus cambios, sigue los pasos listados más arriba para hacer tu contribución.

Cuando abras tu pull request, asegúrate de descomentar la sección de "additional info" en la descripción del pull request, agrega detalles de los cambios y una referencia al issue relacionado a estos.

## Estructura del proyecto

```
open-pixel-art
├── .all-contributorsrc
├── .eleventy.js
├── .eleventyignore
├── .git
├── .github
├── .gitignore
├── .mergify.yml
├── .prettierrc
├── .vscode
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── __tests__
├── _data
├── assets
├── dangerfile.js
├── index.njk
├── package-lock.json
├── package.json
└── styles
```

### `.eleventy.js` y `.eleventyignore`

Este proyecto usa [Eleventy](https://11ty.io). Estos son los archivos de configuración del proyecto.

### `.mergify.yml`

Este proyecto usa [Mergify](https://mergify.io) para incluir automáticamente ciertos PRs, basados en condiciones definidas internamente.

### `__tests__`

Este directorio contiene todos los tests unitarios, y usamos [Jest](https://jestjs.io) para ejecutarlos.

### `_data`

El directorio `_data` contiene el archivo `pixels.json` que representa cada pixel que existe en el canvas, un archivo `defaults.json` que contiene algunos valores por defecto como el tamaño del canvas, y un archivo `env.js` con valores relacionados a los ambientes de la aplicación. Todos los datos estarán automáticamente disponibles en el archivo `index.njk`.

### `assets`

Este directorio contiene recursos estáticos.

### `dangerfile.js`

Este proyecto usa [Danger](https://danger.systems/js) para algunas validaciones y revisiones de código. Este archivo contiene la lógica para eso.

### `index.njk`

Esta es el archivo de la plantilla que usamos para generar el HTML del sitio.

### `styles`

Este directorio contiene todos los estilos personalizados. Los estilos de [`index.njk`](index.njk) están en [`styles/main.css`](styles/main.css).

## Código de Conducta

Queremos que este proyecto sea lo más amigable y acogedor posible. Si interactuas con este proyecto de cualquier forma, estás de acuerdo en adoptar y respetar el [Código de Conducta](CODE_OF_CONDUCT.md) del proyecto. Si sientes que alguien involucrado en este proyecto ha realizado alguna acción que atente contra este Código de Conducta, por favor avísanos enviando un correo electrónico a [open-source@twilio.com](mailto:open-source@twilio.com) para tomar las medidas necesarias.

## Licencia

Todos las contribuciones realizadas serán integradas bajo la misma licencia de código abierto que utiliza este proyecto.
