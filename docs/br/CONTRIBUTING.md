# Contribuindo para o Open Pixel Art

¿Español? Puedes encontrar nuestra guía de contribuciones traducida en [este enlace](docs/es/CONTRIBUTING.md).

Existem duas maneiras de contribuir com este projeto. Você pode contribuir com um único pixel na tela ou com o projeto subjacente. Por exemplo, adicionando testes, atualizando o modelo HTML ou a documentação.

Nos dois cenários, a configuração é a mesma, no entanto, as etapas de contribuição diferem ligeiramente.

## Nunca contribuí com código aberto

![decorative banner image for TwilioQuest mission](../twilio-quest-oss-banner.png)

Contribuir para o código aberto pode ser intimidador a princípio. Por esse motivo, criamos uma missão dentro do [TwilioQuest](https://twil.io/hacktoberfest-quest) que o guiará passo a passo na criação de uma contribuição para este projeto. [Depois de baixar o jogo](https://www.twilio.com/quest/download), você poderá selecionar a missão e ela o guiará por todas as etapas, desde a clonagem do projeto até a criação da sua pull request.

Aproveite sua busca!

## Requisitos

- Uma conta do GitHub
- Git instalado no seu computador. [Aprenda como instalá-lo](https://help.github.com/en/articles/set-up-git)
- [Node.js](https://nodejs.org) e um gerenciador de pacotes como [npm](https://npmjs.com)

## Configurar projeto local

1. [Crie um fork](https://help.github.com/en/articles/fork-a-repo) do projeto
2. Clone o projeto:

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/open-pixel-art.git
```

3. Instale as dependências para desenvolvimento local

```bash
cd open-pixel-art
npm install
```

4. Iniciar um servidor de desenvolvimento local

```bash
npm start
```

5. Abra seu navegador em http://localhost:8080. Você deve ver o mesmo conteúdo que em https://open-pixel-art.com apenas com uma grade na tela que ajuda a posicionar melhor seu pixel.

## Contribuindo com um pixel

Se você deseja contribuir com um pixel, você deve abrir o arquivo [`_data/pixels.json`](_data/pixels.json). Ele contém todos os pixels colocados na tela.

Há duas maneiras de contribuir com um pixel.

### Opção 1: "Reivindicar" um pixel

Algumas entradas no arquivo `pixels.json` existem, mas possuem uma propriedade `username` de `<UNCLAIMED>`. Isso significa que você pode alterá-los para serem seu pixel. Você pode mudar a cor para o que quiser. Depois, altere a propriedade `username` para o nome de usuário do GitHub que você usará para abrir uma pull request.

### Opção 2: criar um pixel

Para criar um pixel, adicione uma nova linha ao array `data` dentro do `pixels.json`.
Um novo pixel deve ser um objeto com as quatro propriedades a seguir:

- `x`: a coordenada x do seu pixel. `0` é a coluna de pixels mais à esquerda
- `y`: a coordenada y do seu pixel. `0` é a linha de pixels mais a baixo
- `color`: a cor que seu pixel deve ter como um código hexadecimal (por exemplo, #ff0000 para vermelho)
- `username`: o nome de usuário do GitHub que você usará para criar a pull request

A linha do seu pixel deve ser classificada primeiro pela coordenada y e depois pela x. Se você não tiver certeza sobre suas alterações, faça a alteração e execute `npm run format: json` e ele deverá classificar seu pixel na posição apropriada.

A mudança deve ficar assim:

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

### Verificando suas alterações

Depois de fazer a alteração, vá para http://localhost:8080 e você verá seu novo pixel. Se você não estiver satisfeito com o posicionamento, continue alterando os valores `x` e `y` e se você não estiver satisfeito com a cor, poderá continuar alterando a propriedade `color`.

Posteriormente, verifique se todos os testes ainda estão passando, executando em outra janela de terminal:

```bash
npm test
```

### Ramificação (branch) e confirmação

Quando estiver satisfeito com as alterações, crie um [branch](https://help.github.com/en/articles/about-branches) para que possamos confirmar as alterações.

```bash
git checkout -b add-my-new-pixel
```

Posteriormente, você terá que escolher sua alteração e confirmá-la executando:

```bash
git add _data/pixels.json
git commit -m "feat(pixels): add my new pixel (x, y)"
```

Substitua `(x, y)` pelas coordenadas xe y do seu pixel alterado, por exemplo `(4, 27)`.
Isso criará um commit com a mensagem `feat(pixels): add my new pixel (4, 27)`.
A mensagem de confirmação está seguindo o [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### Envie suas alterações e criando uma pull request

**Nota:** Se você estiver com problemas para enviar suas alterações ao GitHub, seu branch local do repositório pode não estar atualizada com o repositório atual devido a adições de outros colaboradores. Antes de enviar suas alterações para o GitHub, talvez seja necessário [sincronizar seu fork com o repositório upstream](https://help.github.com/en/articles/syncing-a-fork).

Envie suas alterações para o GitHub executando:

```bash
git push origin add-my-new-pixel
```

Depois, vá para o GitHub e [siga estas instruções](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) para criar uma pull request do seu fork contra o `master` branch do github.com/twilio-labs/open-pixel-art.

## Contribuindo com outras alterações

É ótimo que você queira contribuir com mais de um pixel para este projeto. Antes de começar a trabalhar no código, verifique se já existe uma [issue no GitHub](https://github.com/twilio-labs/open-pixel-art/issues) para essas alterações. Se não houver, abra um primeiro. Se já houver, crie um comentário para que as pessoas saibam que você está trabalhando em uma correção para isso.

Depois de fazer as alterações no código, siga as etapas descritas acima.

Depois de abrir uma pull request, certifique-se de descomentar a seção de informações adicionais no modelo de pull request, adicione uma descrição e faça referência a quaisquer problemas que estiver solucionando.

## Estrutura do projeto

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

### `.eleventy.js` and `.eleventyignore`

O projeto é desenvolvido por [Eleventy](https://11ty.io). Estes são os arquivos de configuração para o projeto

### `.mergify.yml`

O projeto usa o [Mergify](https://mergify.io) para mesclar automaticamente determinados PRs com base em algumas condições.

### `__tests__`

Este diretório contém todos os testes de unidade [Jest](https://jestjs.io)

### `_data`

O diretório `_data` contém o arquivo `pixels.json` que representa cada pixel na tela, um arquivo `defaults.json` que contém valores padrão como o tamanho da tela e o arquivo `env.js` para quaisquer valores relacionados ao ambiente. Todos os dados estarão automaticamente disponíveis no arquivo `index.njk`.

### `assets`

Um diretório para quaisquer ativos estáticos.

### `dangerfile.js`

Usamos [Danger](https://danger.systems/js) para executar algumas verificações de revisão de código. Este arquivo contém a lógica para isso.

### `index.njk`

Este é o arquivo de modelo usado para gerar o HTML do site.

### `styles`

Este diretório contém qualquer CSS personalizado gravado. Os estilos para [`index.njk`](index.njk) estão em [`styles/main.css`](styles / main.css)

## Código de conduta

Queremos garantir que este projeto seja o mais acolhedor possível. Ao interagir com o projeto de qualquer forma ou formato, você concorda com o [Código de Conduta](CODE_OF_CONDUCT.md) do projeto. Se você sentir que outra pessoa violou o código de conduta, envie uma reclamação para [open-source@twilio.com](mailto: open-source@twilio.com).

## Licenciamento

Todos os contribuidores terceirizados reconhecem que todas as contribuições fornecidas serão feitas sob a mesma licença de código aberto que o projeto de código aberto é fornecido.
