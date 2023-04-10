# Bijdragen aan Open Pixel Art

Er zijn twee manieren hoe je kunt aan dit project kunt bijdragen. Je kunt of een enkele pixel aan de canvas toevoegen, of je kan bijdragen aan het onderliggende project. Bijvoorbeeld door testen toe te voegen of de HTML sjabloon of documentatie bijwerken.

Voor beiden scenario's is de setup hetzelfde, echter wijken de stappen voor het bijdragen iets van elkaar af.

## Ik heb nog nooit aan Open Source bijgedragen

![decorative banner image for TwilioQuest mission](../twilio-quest-oss-banner.png)

Het bijdragen aan open source kan in het begin intimiderend overkomen. Om die reden hebben we een een nieuwe missie in [TwilioQuest](https://www.twilio.com/quest) aangemaakt welk jou stap voor stap begeleid richting het aanmaken van een bijdrage voor dit project. Wanneer je de [game hebt gedownload](https://www.twilio.com/quest/download) kun je deze missie selecteren. Het zal je dan door elke stap helpen, van het klonen van het project tot het aanmaken van je pull request.

## Vereisten
- Een GitHub account
- git geïnstalleerd op je computer. [Leer hoe je dit doet](https://help.github.com/en/articles/set-up-git) (Engels)
- [Node.js](https://nodejs.org) een een package manager zoals [npm](https://npmjs.com)

## Lokaal project opzetten
1. [Maak een fork aan](https://help.github.com/en/articles/fork-a-repo) (engels) van dit project
2. Kloon het project:

```bash
git clone https://github.com/<JOUW_GITHUB_GEBRUIKERSNAAM>/open-pixel-art.git
```

Indien je je huidige aparaat met SSH hebt ingesteld kun je dit in de plaats doen:

```bash
git clone git@github.com:<JOUW_GITHUB_GEBRUIKERSNAAM>/open-pixel-art.git
```

3. Installeer de afhankelijkheden voor lokale ontwikkeling

```bash
cd open-pixel-art
npm install
```

4. Start een lokale ontwikkelserver

```bash
npm start
```

5. Open de browser naar http://localhost:8080. Je zou nu dezelfde inhoud als op https://open-pixel-art.com moeten zien plus een grid over de canvast om te helpen met het plaatsen van jouw pixel.

---

Er is ook een optie om via Docker het project op te zetten. Volg de volgende stappen om daar mee aan de slag te gaan.

1. BBouw de Docker image

```bash
 docker build -t open-pixel-art .
```

2. Start de Docker image

```bash
docker run -d -p 8080:8080 -it open-pixel-art
```
Als de docker image niet bouwt dan staat er waarschijnlijk een fout in jouw code waardoor de testen niet als succesvol worden afgerond. Indien alles wel correct bouwt dan kun je dit testen op de volgende url http://localhost:8080. Je zou nu dezelfde inhoud als op https://open-pixel-art.com moeten zien plus een grid over de canvast om te helpen met het plaatsen van jouw pixel.

Je kunt ook verifiëren of het project draait door `docker ps --all` uit te voeren. Hier valt te zien dat een image genaamd `open-pixel-art` aanwezig is plus waar je deze kunt benaderen.

Bijvoorbeeld:

```bash
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                         PORTS                     NAMES
c861ba4389fe        open-pixel-art      "docker-entrypoint.s…"   7 minutes ago       Up 7 minutes                   0.0.0.0:8080->8080/tcp    sleepy_lamarr
```

## Een pixel bijdragen

Voor het toevoegen van een pixel open je het [`_data/pixels.json`](../../_data/pixels.json) bestand. Deze bevat alle pixels welk geplaatst worden in de canvas.

## Een pixel aanmaken

Zoek voor het aanmaken van een nieuwe pixel een lege ruimte tussen de nummers van de `x` of `y` coördinaten in de `data` array binnen het `pixels.json` bestand.
Wanneer je een open positie hebt gevonden kun je hiervoor een nieuwe pixelregel aanmaken.
Een nieuwe pixelregel hoort een object te zijn met de volgende vier eigenschappen:

- `x`: De x-coördinaat van jouw pixel. `0` is de meest linker pixelkolom
- `y`: De y-coördinaat van jouw pixel. `0` is de onderste pixelrij
- `color`: De kleur van jouw pixel hoort een hex-code te zijn (bijv. #ff0000 voor rood)
- `username`: De GitHub gebruikersnaam die je gaat gebruiken voor het aanmaken van de pull request

De rij voor jouw pixel hoort eerst gesorteerd te worden bij de y-coördinaat en daarna de x-coördinaat. Als je niet zeker van je wijzigingen bent kun je `npm run format:sort-pixels` uitvoeren wat jouw pixel in de correcte positie hoort te sorteren.

De aanpassing zou er zo uit moeten zien:

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
### Verifiëer je aanpassingen

Ga nadat je je aanpasing hebt gemaakt naar http://localhost:8080, daar zou je jouw nieuwe pixel horen te zien. Wanneer je nog niet blij met de positionering kun je de `x` en `y` waardes aanpassen en als je nog niet blijk bent de `color` kun je deze veranderen in de `color` eigenschap.

Verzeker jezelf dat hierna de testen nog steeds passeren door het volgende in een andere terminal te openen:

```bash
npm test
```

### Branchen en committen

Maak wanneer je blij bent met de aanpassingen een [branch](https://help.github.com/en/articles/about-branches) (engels) aan zodat we de aanpassingen kunnen committen.

```bash
git checkout -b add-my-new-pixel
```

Daarna selecteer je jouw aanpassingen en commit het door het volgende uit te voeren:

```bash
git add _data/pixels.json
git commit -m "feat(pixels): add my new pixel (x, y)"
```

Vervang `(x, y)` met de x- en y-coördinaten van jouw toegevoegde pixel, bijv. `(4, 27)`.
Dit maakt een nieuwe commit aan met het bericht `feat(pixels): add my new pixel (4, 27)`.
Het commitbericht volgt de [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### Push jouw aanpassingen en een pull request aanmaken
**Notitie:** Als je problemen ondervindt met het naar GitHub pushen van jouw aanpassingen kan het zijn dat de repository niet is bijgewerkt vanwege wijzigingen van andere bijdragers. Voordat je jouw aanpassingen naar GitHub pusht kan het nodig zijn om [je fork te synchroniseren met de upstream repository](https://help.github.com/en/articles/syncing-a-fork) (engels). Propbeer `npm run sync-fork` uit te voeren om je fork automatisch te synchroniseren.

Push je aanpassingen naar GitHub door het volgende uit te voeren:

```bash
git push origin add-my-new-pixel
```

Ga daarna naar GitHub en volg [deze instructies](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) (engels) om een pull request voor jouw fork tegen de `master` branch van github.com/twilio-labs/open-pixel-art te maken.

## Andere aanpassingen bijdragen

Leuk dat je wilt iets anders dan een pixel wilt bijdragen aan dit project. Controleer voordat je begint aan de code of er al een [GitHub issue](https://github.com/twilio-labs/open-pixel-art/issues) bestaat voor de aanpassingen. Zo nee, maak deze alsjeblieft eerst aan. Laat als er al wel eentje bestaat een bericht daar achter om andere te laten weten dat je met de issue aan de slag gaat.

Volg nadat je de code hebt aangepast alsjeblieft de hierboven genoemde stappen.

Zorg nadat je een pull request hebt geopend dat je de additionele info-sectie uncomment in het pull request sjabloon, en voeg een descriptie en referentie naar de bijhorende issue toe.

### Richtlijnen bijdragen documentatie

Open alsjeblieft geen pull request voor inconsequente grammaticale aanpassingen in de README of andere documentatie. Dit soort bijdragen zijn niet in de gedachtenis van Hacktoberfest en zullen niet worden geaccepteerd.

Voorbeelden van ongewenste bijdragen houden in maar zijn niet gelimiteerd tot:

- onnodige komma's, koppeltekens of uitroeptekens toevoegen
- zinnen herformuleren die al duidelijk genoeg zijn
- spelling van Amerikaans Engels naar Brits Engels veranderen

De volgende bijdragen aan documentatie zijn welkom en worden gewaardeerd:

- het toevoegen van vertalingen naar nieuwe talen
- niet werkende linken repareren
- gebroken markdown opmaak repareren
- grammatica en spelling verbeteren

## Project structuur

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

### `.eleventy.js` en `.eleventyignore`

Het project gebruikt [Eleventy](https://11ty.io). Deze zijn configuratiebestanden voor het project.

### `.mergify.yml`

Het project gebruikt [Mergify](https://mergify.io) voor het automatisch mergen van bepaalde PR's, gebaseerd op wat condities.

### `__tests__`

Deze map bevat alle door [Jest](https://jestjs.io)-aangedreven unit testen.

### `_data`

De `_data` map welk het `pixels.json` bestand dat alle pixels van de canvas representeert, een `defaults.json` bestand dat alle standaard waardes zoals de groote van de canvas en het `env.js` bestand voor alle omgevings gerelateerde waardes bevat. Alle data wordt automatisch beschikbaar in het `index.njk` bestand.

### `assets`

Een map voor alle statische bestanden.

### `dangerfile.js`

We gebruiken [Danger](https://danger.systems/js) om bepaalde code review controles uit te voeren. Dit bestand bevat hiervoor de logica.

### `index.njk`

Dit is het sjabloonbestand dat wordt gebruikt voor het genereren van de HTML van de website.

### `styles`

Deze map bevat alle gescreven CSS aanpassingen. De stijlen voor [`index.njk`](../../index.njk) staan in [`styles/main.css`](../../styles/main.css)

## Gedragscode

We wille garanderen dat dit project zichzelf zo veel mogelijk vertegenwoordigd als verwelkomend voor mensen. Door interactie met het project in elke vorm dan ook ga je akkoord met de [gedragscode](../../CODE_OF_CONDUCT.md). Als je vindt dat een ander individueel de gedragscode overtreed laat dit dan graag via [open-source@twilio.com](mailto:open-source@twilio.com) weten.

## Licensing

Alle buitenstaande bijdragers erkennen dat alle bijdragen die zij aanbieden onder dezelfde open source licentie komt te vallen waaronder het open source project valt.