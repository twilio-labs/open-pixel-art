# 如何参与 Open Pixel Art

¿Español? Puedes encontrar nuestra guía de contribuciones traducida en [este enlace](docs/es/CONTRIBUTING.md).

为 Open Pixel Art 贡献代码的方法有两种， 一是在 canvas（画布）上加一个 pixel（像素点），再者就是参与项目的开发，例如增加代码测试、更新 HTML 模板或者更新技术文档。

这两个方法的初始设置一样，但提交贡献的步骤稍有不同。

## 这是我第一次为开源项目贡献代码

![decorative banner image for TwilioQuest mission](../twilio-quest-oss-banner.png)

为了使你第一次为开源项目贡献代码更顺利，我们在[TwilioQuest](https://twil.io/hacktoberfest-quest)里增加了一个“手把手为这个项目贡献代码”的教程任务。只需[下载这个游戏](https://www.twilio.com/quest/download)即可选择此任务，教程涵盖从克隆项目（cloning）到提交代码（pull request）的每一步骤。

祝你开源项目探险愉快！

## 贡献代码的所需条件

- 一个 Github 账号
- 电脑上下载了 git，[点我进入 git 的下载教程](https://help.github.com/en/articles/set-up-git)
- [Node.js](https://nodejs.org) 和一个包管理工具（package manager），例如 [npm](https://npmjs.com)

## 在本地电脑上设置项目（local setup）

1. [复制（fork）一份到自己的仓库](https://help.github.com/en/articles/fork-a-repo)
2. 克隆到本地电脑：

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/open-pixel-art.git
```

3. 下载本地开发所需的依赖（dependencies）

```bash
cd open-pixel-art
npm install
```

4. 启动本地服务器（local development server）

```bash
npm start
```

5. 在浏览器打开 http://localhost:8080. 你应该看到和 https://open-pixel-art.com 一样的内容，只不过画布（canvas）上会有明显的边线来帮助你定位像素点（pixel）。

---

另一个设置方法是使用 Docker，你可以根据以下步骤进行设置。

1. 建立 Docker 镜像（Docker Image）

```bash
 docker build -t open-pixel-art .
```

2. 启动镜像

```bash
docker run -d -p 8080:8080 -it open-pixel-art
```

若镜像创建失败，很有可能是你的代码里有错误（error）导致测试无法通过。如果一切顺利，你可以通过 http://localhost:8080进行连接。你将会看到和 https://open-pixel-art.com 一样的内容，只不过画布（canvas）上会有明显的边线来帮助你定位像素点（pixel）。

你也可以通过指令`docker ps --all`来确定是否运行顺利，你将会看到一个可连接的，叫`open-pixel-art`的镜像（Image）。

例子:

```bash
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                         PORTS                     NAMES
c861ba4389fe        open-pixel-art      "docker-entrypoint.s…"   7 minutes ago       Up 7 minutes                   0.0.0.0:8080->8080/tcp    sleepy_lamarr
```

## 贡献一个像素点（Pixel）

如果你想要贡献一个像素点，打开文件[`_data/pixels.json`](_data/pixels.json)， 这里收录了画布上所有的像素点。

贡献像素点的方法有两种。

### 方法一: "领养" 一个像素点

文件`pixels.json`里有一些数据中用户名（`username`）的值是待领养（`<UNCLAIMED>`）。这代表你可以领养它，只需把`username`的值换成你的 Github 用户名（请使用你提交代码的账号）并把颜色换成你喜欢的颜色。

### 方法二：创造一个像素点

在`pixels.json`文件里的`data`数组（array）新增一行即可创造一个像素点。
一个新的像素点必须是一个有下面这四个 properties 的 object：

- `x`: 像素点的 x 坐标。`0` 代表最左列。
- `y`: 像素点的 y 坐标。`0` 代表最底行。
- `color`: 像素点的颜色，应是 hex code (例如 #ff0000 就会是红色)
- `username`: 你将用来提交代码的 Github 账号用户名

你所增加的那一行数据应该以“先 y 坐标，后 x 坐标”进行排序。如果不确定，可以通过指令`npm run format:sort-pixels`来进行自动排序。

你所做的更改应该看起来像酱:

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

### 确认你所做的更改

完成更改后，你应该能在 http://localhost:8080 看到你的像素点。如果你不满意像素点的坐标，可以通过更改 `x` 和 `y` 的值，也可以把 `color` 的值改成你更喜欢的颜色。

一切就绪后，请在不同的命令窗（terminal）里打入以下命令进行测试并确保所有测试都顺利通过：

```bash
npm test
```

### 代码分支与呈交

想要呈交代码时，先创建一个[分支（branch）](https://help.github.com/en/articles/about-branches)。

```bash
git checkout -b add-my-new-pixel
```

然后输入以下命令来选择你所做的更改并进行呈交（commit）

```bash
git add _data/pixels.json
git commit -m "feat(pixels): add my new pixel (x, y)"
```

请把以上命令里的 `(x, y)` 换成你的像素点的坐标, 比如说 `(4, 27)`。
这行命令将创建一个新的呈交讯息（commit message）`feat(pixels): add my new pixel (4, 27)`。
此讯息遵守了 [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### 上传并提交代码（Push Your Changes and Creating a Pull Request）

**注意:** 如果你无法上传你的代码，或许是因为你的本地分支（local branch）因为其他贡献者的提交而和本项目不同步。在上传之前，你可能需要[同步本地项目与原本项目](https://help.github.com/en/articles/syncing-a-fork)。

输入以下命令来上传你的代码：

```bash
git push origin add-my-new-pixel
```

之后，前往 GitHub 并按照[这个指示](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) 来呈交（pull request）你克隆对比 github.com/twilio-labs/open-pixel-art 的`master`分支的代码。

## 参与项目开发

可喜可乐！你想要为此项目贡献除了像素点以外的代码。在开始之前，请先确认[GitHub issue](https://github.com/twilio-labs/open-pixel-art/issues)是否有相关 Issue。如果没有的话，请先创建一个；如果有，记得留言让大家知道你在处理相关 Issue。

准备提交时，请遵守上述步骤。

创建 pull request 时，记得注销（uncomment）“附加资料栏（additional info section）”的注释并且加上一段叙述（description）和附上（reference）任何相关 Issue。

## 项目结构

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

此项目是基于（powered by） [Eleventy](https://11ty.io)的。这些文件是这个项目的设置文件（configuration files）。

### `.mergify.yml`

此项目使用 [Mergify](https://mergify.io) 来自动整合（auto-merge）某些特定的代码提交。

### `__tests__`

这个文件夹里有所有[Jest](https://jestjs.io)-powered unit tests

### `_data`

这个`_data`文件夹里有装有所有像素点的`pixels.json`文件、装有初始值（例如画布的大小）的`defaults.json`文件，还有装有 environment related values 的`env.js`文件。所有数据都可于`index.njk`获得。

### `assets`

装有 static assets 的文件夹。

### `dangerfile.js`

我们使用[Danger](https://danger.systems/js)来处理代码审查机制（code review checks），这个文件夹里是相关的逻辑。

### `index.njk`

这是用来产网页 HTML 的模板文件。

### `styles`

这个文件夹装的是我们的 CSS。[`index.njk`](index.njk)的 CSS 在 [`styles/main.css`](styles/main.css)里。

## 行为准则（Code of Conduct）

我们致力于确保此项目的最大友好化。任何形式的参与都需遵守此项目的[行为准则（Code of Conduct）](CODE_OF_CONDUCT.md)。若发现任一个体触犯了此准则，请向[open-source@twilio.com](mailto:open-source@twilio.com)进行举报。

## 许可证（Licensing）

所有第三方贡献者都应意识到所提供的任何贡献必须遵守此项目的许可证的使用权限。
