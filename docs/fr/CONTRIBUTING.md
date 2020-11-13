# Contribuer à Open Pixel Art

Il y a 2 manières de contribuer à ce projet. 

There are two ways you can contribute to this project. Vous pouvez soit apporter un seul pixel au mur déjà créé, soit contribuer au projet sous-jacent. Par exemple en ajoutant des tests, en mettant à jour le modèle HTML ou en actualisant la documentation.

Pour les deux scénarios, la configuration est la même, mais les étapes de contribution diffèrent légèrement.

## Je n'ai jamais contribué à un proejt Open-Source

![decorative banner image for TwilioQuest mission](./docs/twilio-quest-oss-banner.png)

Contribuer à l'open source peut être intimidant au début. C'est pourquoi nous avons créé un
une nouvelle mission au sein de [TwilioQuest] (https://www.twilio.com/quest) qui vous guidera
étape par étape en créant une contribution pour ce projet. Une fois que vous aurez [téléchargé le jeu] (https://www.twilio.com/quest/download), vous pourrez sélectionner la mission et
elle vous guidera à chaque étape, du clonage du projet à la création de votre demande d'extraction.

Profitez de votre quête!

## Pré-requis

- Un compte Github
- git installé sur votre ordinateur. [Learn how to install it](https://help.github.com/en/articles/set-up-git)
- [Node.js](https://nodejs.org) et un gestionnaire de paquet comme [npm](https://npmjs.com)

## Configurer un projet local

1. [Créer un fork](https://help.github.com/en/articles/fork-a-repo) de ce projet
2. Cloner le projet:

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/open-pixel-art.git
```

Si vous avez configuré git avec une clé SSH, vous pouvez faire ceci à la place:

```bash
git clone git@github.com:<YOUR_GITHUB_USERNAME>/open-pixel-art.git
```

3. Installer les dépendances pour le développement local

```bash
cd open-pixel-art
npm install
```

4. Démarrer un serveur local de développement

```bash
npm start
```

5. Ouvrez votre navigateur à l'adresse http://localhost:8080. Vous devriez voir le même résultat que sur https://open-pixel-art.com avec juste une grille sur le tabelau pour vous aider à placer votre pixel.

---

Il y a également une option pour lancerle projet via Docker. Pour lancer le projet avec Docker, suivez les instructions.

1. Construisez l'image Docker.

```bash
 docker build -t open-pixel-art .
```

2. Démarrez l'image Docker.

```bash
docker run -d -p 8080:8080 -it open-pixel-art
```

Si l'image du docker ne se construit pas, il y a probablement une erreur dans votre code et les tests ne passent pas. Si tout est correct, vous pouvez facilement vous connecter en vous rendant à l'adresse suivante : http://localhost:8080. Vous devriez voir le même contenu que sur https://open-pixel-art.com avec juste une grille sur le tableau qui vous aide à mieux placer votre pixel.

Vous pouvez aussi vérifier s'il fonctionne en faisant `docker ps --all` Vous verrez une image appelée `open-pixel-art` et où vous pouvez aussi y accéder
Exemple:

```bash
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                         PORTS                     NAMES
c861ba4389fe        open-pixel-art      "docker-entrypoint.s…"   7 minutes ago       Up 7 minutes                   0.0.0.0:8080->8080/tcp    sleepy_lamarr
```

## Contribuer aux pixels

Si vous voulez contribuer aux pixels, vous devez ouvrir le fichier [`_data/pixels.json`](_data/pixels.json). Il contient chaque pixel placé sur la toile.

### Créer un nouveau pixel

Pour créer un nouveau pixel, recherchez un espace entre les nombres pour les coordonnées "x" ou "y" dans le tableau "data" à l'intérieur du "pixels.json".
Une fois que vous avez trouvé une position disponible, ajoutez un nouveau pixel.
Un nouveau pixel doit être un objet ayant les quatre propriétés suivantes :

- `x` : La coordonnée x de votre pixel. `0` est la colonne de pixels la plus à gauche
- `y` : La coordonnée y de votre pixel. `0` est la rangée de pixels la plus basse
- `color` : La couleur que votre pixel doit avoir comme code hexadécimal (par exemple #ff0000 pour le rouge)
- `username` : Le nom d'utilisateur GitHub que vous utiliserez pour créer la demande d'extraction

La rangée de votre pixel doit être triée d'abord par la coordonnée y, puis par la coordonnée x. Si vous n'êtes pas sûr de vos modifications, faites le changement et lancez `npm run format:sort-pixels` et il devrait trier votre pixel dans la position appropriée.

Le changement devrait ressembler à ceci :

```diff
{
  "data": [
    {"y": 1, "x": 3, "color": "#F22F46", "username": "twilio-labs"},
+    { "y": 1, "x": 4, "color": "#FFFF00", "username": "Silvoax"},
    {"y": 2, "x": 9, "color": "#F22F46", "username": "twilio"},
    ...
  ]
}
```

### Verifying your changes

Une fois que vous avez fait votre changement, allez sur http://localhost:8080 et vous devriez voir votre nouveau pixel. Si vous n'êtes pas satisfait du placement, continuez à changer les valeurs "x" et "y" et si vous n'êtes pas satisfait de la "couleur", vous pouvez continuer à changer la propriété "color".

Ensuite, assurez-vous que tous les tests sont toujours réussis en exécutant dans un terminal différent :

```bash
npm test
```

### Branche et commits

Une fois que vous êtes satisfait des changements, créez une [branche] (https://help.github.com/en/articles/about-branches) afin d'effectuer les changements.

```bash
git checkout -b add-my-new-pixel
```

Ensuite, vous devrez choisir votre changement (fichier ayant été modifié) et l'ajouter en faisant :

```bash
git add _data/pixels.json
git commit -m "feat(pixels): add my new pixel (x, y)"
```

Remplacez `(x, y)` par la coordonnée x et la coordonnée y du pixel modifié, par exemple `(4, 27)`.
Cela créera un nouveau commit avec le message `feat(pixels) : add my new pixel (4, 27)`.
Le message de commit suit la [norme de commit conventionnel] (https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### Pousser votre commit et créer une 'Pull Request'

**Note:** Si vous avez du mal à faire accepter vos modifications sur GitHub, il se peut que votre branche locale du dépôt ne soit pas à jour avec le dépôt actuel en raison des ajouts d'autres contributeurs. Avant d'envoyer vos modifications à GitHub, vous devrez peut-être [synchroniser votre fork avec le dépôt en amont] (https://help.github.com/en/articles/syncing-a-fork). Essayez de lancer `npm run sync-fork` pour synchroniser votre fork automatiquement.

Apportez vos modifications à GitHub en exécutant :

```bash
git push origin add-my-new-pixel
```

Ensuite, rendez-vous sur GitHub et [suivez ces instructions] (https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) pour créer une "pull request" à partir de votre fork sur la branche "master" de github.com/twilio-labs/open-pixel-art.

### Problèmes en créant la "Pull Request"

When many users are creating pull requests at the same time then it might be hard to get your branch up to date. The easiest way to overcome this problem is to run the following commands which brings all the required changes to your forked repo.

Make sure you have the latest changes by running this command

Lorsque de nombreux utilisateurs créent des "Pull Request" en même temps, il peut être difficile de mettre à jour votre branche. La façon la plus simple de corriger ce problème est d'exécuter les commandes suivantes qui apportent toutes les modifications nécessaires à votre repo forké.

Assurez-vous d'avoir les dernières modifications en exécutant cette commande

```bash
npm install
```
Maintenant, vous pouvez simplement le synchroniser avec le fork en exécutant cette commande
```bash
npm run sync-fork
```

## Contribuer à d'autres changements

C'est super que vous vouliez contribuer à ce projet pour d'autres chose que juste un nouveau pixel. Avant de commencer à travailler sur le code, assurez-vous de vérifier s'il existe déjà une [discussion GitHub] (https://github.com/twilio-labs/open-pixel-art/issues) pour ces changements. S'il n'y en a pas, veuillez en ouvrir un d'abord. S'il y en a déjà un, assurez-vous de créer un commentaire pour faire savoir aux gens que vous travaillez sur une correction de ce problème.

Après avoir effectué les modifications du code, veuillez suivre les étapes décrites ci-dessus.

Une fois que vous avez ouvert une "Pull Request", assurez-vous de décommenter la section d'informations supplémentaires dans le modèle de "Pull Request" et d'ajouter une description ainsi qu'une référence à tout problème que cela permet de résoudre.

### Documentation Contribution Guidelines

Veuillez ne pas ouvrir de "Pull Request" pour des changements grammaticaux sans conséquence dans le README ou dans d'autres documents. Ces types de contributions ne sont pas dans l'esprit de la Hacktoberfest et ne seront pas acceptées.

Voici quelques exemples de contributions non souhaitées

- l'ajout inutile de virgules, de traits d'union ou de points d'exclamation
- la reformulation de phrases qui sont déjà suffisamment claires
- changer l'orthographe de l'anglais américain à l'anglais britannique

Ce type de contributions documentaires est bienvenu et apprécié :

- l'ajout de traductions dans de nouvelles langues
- Réparer les liens morts
- Correction du formatage du markdown
- Correction des fautes de frappe ou d'orthographe

## Structure du projet

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

### `.eleventy.js` et `.eleventyignore`

Le projet est alimenté par [Eleventy] (https://11ty.io). Voici les fichiers de configuration du projet

### `.mergify.yml`

Le projet utilise [Mergify](https://mergify.io) pour auto-fusionner certains RP sous certaines conditions.

### `__tests__`

Ce répertoire contient tous les tests unitaires [Jest](https://jestjs.io).

### `_data`

Le répertoire `_data` Conteitn le fichier `pixels.json` qui représente chaque pixel du tableau, un fichier `defaults.json` qui contient toutes les valeurs par défaut comme la taille du tableaue, et le fichier `env.js` pour toutes les variables d'environnement. Toutes les données seront automatiquement disponibles dans le fichier `index.njk`.

### `assets`

Le répertoire pour tous les assets statiques.

### `dangerfile.js`

Nous utilisons [Danger] (https://danger.systems/js) pour effectuer certains contrôles de révision de code. Ce fichier contient sa logique.

### `index.njk`

C'est le template qui est utilisé pour générer le HTML du site web.

### `styles`

Ce répertoire contient tout CSS personnalisé écrit. Les styles pour [`index.njk`](index.njk) sont dans [`styles/main.css`](styles/main.css)

## Code de Conduite

Nous voulons nous assurer que ce projet est aussi accueillant que possible pour les gens. En interagissant avec le projet sous quelque forme que ce soit, vous acceptez le [Code de conduite] du projet (CODE_OF_CONDUCT.md). Si vous pensez qu'une autre personne a violé le code de conduite, veuillez déposer une plainte auprès de [open-source@twilio.com](mailto:open-source@twilio.com).

## Licence

Tous les contributeurs tiers reconnaissent que toute contribution qu'ils fournissent sera faite sous la même licence open source que celle sous laquelle le projet open source est issu.
