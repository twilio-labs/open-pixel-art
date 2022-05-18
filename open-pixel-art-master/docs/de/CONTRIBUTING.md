# Beitrag zu Open Pixel Art

Es gibt zwei Möglichkeiten, wie du zu diesem Projekt beitragen kannst. Du kannst entweder ein einzelnes Pixel zur Zeichenfläche hinzufügen oder einen Beitrag zum zugrunde liegenden Projekt leisten. Zum Beispiel durch Hinzufügen von Tests, Aktualisieren der HTML-Vorlage oder Aktualisieren der Dokumentation.

Für beide Szenarien ist der Aufbau gleich, jedoch unterscheiden sich die Beitragsschritte geringfügig.

## Ich habe noch nie zu Open Source beigetragen

![decorative banner image for TwilioQuest mission](../twilio-quest-oss-banner.png)

Einen Beitrag zu Open Source zu leisten, kann zunächst einschüchternd sein. Aus diesem Grund haben wir eine neue Mission in [TwilioQuest](https://twil.io/hacktoberfest-quest), die dich
Schritt für Schritt durch das Erstellen eines Beitrags für dieses Projekt führt. Sobald du [das Spiel heruntergeladen](https://www.twilio.com/quest/download) hast, kannst du die Mission auswählen und wirst anschließend durch alle Schritte durchgeführt, vom Klonen des Projekts bis zur Erstellung deines Pull-Requests.

Viel Spaß bei der Quest!

## Was du brauchst

- Einen GitHub-Account
- git auf deinem Computer installiert. [Erfahre hier, wie du es installierst](https://help.github.com/de/articles/set-up-git)
- [Node.js](https://nodejs.org) und ein Paketmanager wie [npm](https://npmjs.com)

## Lokales Projekt erstellen

1. [Fork erstellen](https://help.github.com/de/articles/fork-a-repo) dieses Projekts
2. Klone das Projekt:

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/open-pixel-art.git
```

3. Installiere die Abhängigkeiten für die lokale Entwicklung

```bash
cd open-pixel-art
npm install
```

4. Starte einen lokalen Entwicklungsserver

```bash
npm start
```

5. Öffne deinen Browser unter http://localhost:8080. Du solltest den gleichen Inhalt wie auf https://open-pixel-art.com sehen, nur mit einem Raster auf der Leinwand, mit dem du dein Pixel besser platzieren kannst.

---

Es gibt darüber hinaus auch die Möglichkeit, das Projekt mittels Docker aufzusetzen. Führe die folgenden Schritte durch, um das Projekt mit Docker zu betreiben.

1. Erzeuge das Docker-Image

```bash
 docker build -t open-pixel-art .
```

2. Starte das Docker-Image

```bash
docker run -d -p 8080:8080 -it open-pixel-art
```

Wenn das Docker-Image nicht erstellt werden kann, liegt wahrscheinlich ein Fehler im Code vor und die Tests schlagen fehl. Sollte alles in Ordnung sein, kannst du die Url http://localhost:8080 in deinem Browser aufrufen. Du solltest den gleichen Inhalt wie auf https://open-pixel-art.com sehen, nur mit einem Raster auf der Leinwand, mit dem du dein Pixel besser platzieren kannst.

Um zu verifizieren, dass alles läuft, führe `docker ps --all` aus. Dort solltest du ein Image mit dem Namen `open-pixel-art` vorfinden und auf dieses auch zugreifen können.

Beispiel:

```bash
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                         PORTS                     NAMES
c861ba4389fe        open-pixel-art      "docker-entrypoint.s…"   7 minutes ago       Up 7 minutes                   0.0.0.0:8080->8080/tcp    sleepy_lamarr
```

## Einen Pixel beisteuern

Wenn du einen Beitrag zu einem Pixel leisten möchtest, musst du die Datei [`_data/pixels.json`](_data/pixels.json) öffnen. Diese Datei enthält alle, auf der Leinwand platzierten Pixel.

### Erstelle ein neues Pixel

Um ein neues Pixel zu erstellen, füge dem `data`-Array in der`pixels.json` eine neue Zeile hinzu.
Ein neues Pixel muss ein Objekt mit den folgenden vier Eigenschaften sein:

- `x`: Die x-Koordinate deines Pixels. `0` ist die am weitesten links stehende Pixelspalte
- `y`: Die y-Koordinate deines Pixels. `0` ist die unterste Pixelreihe
- `color`: Die Farbe, die dein Pixel als Hex-Code haben sollte (z. B. # ff0000 für Rot)
- `username`: Der GitHub-Benutzername, mit dem du den Pull-Request erstellst.

Die Zeile für dein Pixel sollte zuerst nach der y-Koordinate und dann nach der x-Koordinate sortiert werden. Wenn du dir bei deinen Änderungen unsicher bist, nehme deine Änderungen vor und führe anschließend `npm run format: json` aus. Dies sollte dein Pixel an der entsprechenden Position einsortieren.

Die Änderung sollte folgendermaßen aussehen:

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

### Überprüfe deine Änderungen

Wenn du deine Änderungen vorgenommen hast, rufe http://localhost:8080 auf und du solltest dein neues Pixel sehen. Solltest du mit der Platzierung nicht zufrieden sein, ändere die Werte "x" und "y" weiter. Bist du mit der Farbe nicht zufrieden, kannst du die Eigenschaft `color` weiter ändern.

Stelle anschließend sicher, dass alle Tests noch bestehen, indem du auf einem anderen Terminal ausführst:

```bash
npm test
```

### Branching und Committing

Wenn du mit deinen Änderungen zufrieden bist, erstelle einen [branch](https://help.github.com/de/articles/about-branches), damit wir die Änderungen übernehmen können.

```bash
git checkout -b add-my-new-pixel
```

Anschließend musst du deine Änderung auswählen und committen:

```bash
git add _data/pixels.json
git commit -m "feat(pixels): add my new pixel (x, y)"
```

Ersetze `(x, y)` durch die x-Koordinate und die y-Koordinate deines geänderten Pixels, z. B. "(4, 27)".
Dadurch wird ein neuer Commit mit der Meldung "feat (pixels): add my new pixel (4, 27)" erstellt.
Die Commit-Meldung folgt dem [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### Pushe deine Änderungen und erstelle einen Pull-Requet

Wenn du Probleme beim Übertragen deiner Änderungen auf GitHub hast, ist dein lokaler Branch des Repositories möglicherweise nicht auf dem neuesten Stand, da andere Mitwirkende das Repository zwischenzeitlich bearbeitet haben. Bevor du deine Änderungen an GitHub übertragen kannst, musst du möglicherweise [deinen fork mit dem Upstream-Repository synchronisieren](https://help.github.com/de/articles/syncing-a-fork). Versuche, durch Ausführen von `npm run sync-fork`, deinen Fork automatisch zu synchronisieren.

Übertrage deine Änderungen auf GitHub, indem du folgendes ausführst:

```bash
git push origin add-my-new-pixel
```

Gehe anschließend zu GitHub und [folge diesen Anweisungen](https://help.github.com/de/articles/creating-a-pull-request-from-a-fork), um einen Pull-Request von deinem Fork gegen den `master`-Branch von github.com/twilio-labs/open-pixel-art zu erstellen.

## Andere Änderungen beisteuern

Es ist großartig, dass du mehr als ein Pixel zu diesem Projekt beitragen möchtest. Bevor du mit der Arbeit am Code beginnst, überprüfe, ob bereits ein [GitHub-Problem](https://github.com/twilio-labs/open-pixel-art/issues) für diese Änderungen vorliegt. Wenn nicht, öffne bitte zuerst eines. Wenn es bereits eines gibt, stelle sicher, dass du einen Kommentar erstellst, um die Leute darüber zu informieren, dass du an einer Lösung für dieses Problem arbeitest.

Befolge nach dem Ändern des Codes die oben beschriebenen Schritte.

Wenn du einen Pull-Request öffnest, musst du den Abschnitt mit den zusätzlichen Informationen in der Pull-Anforderungsvorlage auskommentieren und eine Beschreibung hinzufügen sowie auf Probleme verweisen, die hiermit behoben werden.

### Richtlinien zur Beisteuerung von Dokumentationsbeiträgen

Bitte eröffne keine Pull-Requests für unwichtige, grammatikalische Änderungen in der README-Datei order anderen Dokumentationen.
Diese Art von Beiträgen sind nicht im Sinne des Hacktoberfestes und werden nicht akzeptiert.

Beispiele für unerwünschte Beiträge sind unter anderem:

- Hinzufügen von unnötigen Kommas, Bindestrichen oder Ausrufezeichen
- Sätze umformulieren, die bereits aussagekräftig genug sind
- Ändern der Schreibweise von amerikanischem Englisch in britisches Englisch

Willkommene Beiträge zur Dokumentation sind hingegen:

- Hinzufügen von Übersetzungen in neue Sprachen
- Korrektur defekter Verlinkungen
- Korrektur von fehlerhaftem Markdown
- Korrektur von Tippfehlern oder falsch geschriebener Wörter

## Projekt Struktur

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

### `.eleventy.js` und `.eleventyignore`

Das Projekt wird von [Eleventy](https://11ty.io) betrieben. Dies sind die Konfigurationsdateien für das Projekt.

### `.mergify.yml`

Das Projekt verwendet [Mergify](https://mergify.io), um bestimmte PRs basierend auf bestimmten Bedingungen automatisch zusammenzuführen.

### `__tests__`

Dieses Verzeichnis enthält alle [Jest](https://jestjs.io) - gesteuerten Komponententests

### `_data`

Das Verzeichnis "\_data" enthält die Datei "pixels.json", die jedes einzelne Pixel auf der Zeichenfläche darstellt, eine Datei "defaults.json", die Standardwerte wie die Größe der Zeichenfläche enthält, und die Datei "env.js" für Beliebige umweltbezogene Werte. Alle Daten stehen automatisch in der Datei "index.njk" zur Verfügung.

### `assets`

Ein Verzeichnis für statische Assets.

### `dangerfile.js`

Wir verwenden [Danger](https://danger.systems/js), um einige Codeüberprüfungen durchzuführen. Diese Datei enthält die Logik dafür.

### `index.njk`

Dies ist die Vorlagendatei, mit der der HTML-Code der Website generiert wird.

### `styles`

Dieses Verzeichnis enthält benutzerdefiniertes CSS. Die Stile für [`index.njk`](index.njk) befinden sich in [`styles/main.css`](styles/main.css)

## Verhaltenskodex

Wir möchten sicherstellen, dass dieses Projekt so einladend wie möglich ist. Durch die Interaktion mit dem Projekt in jeglicher Form stimmst du dem [Verhaltenskodex](CODE_OF_CONDUCT.md) des Projekts zu. Wenn du der Meinung bist, dass eine andere Person gegen den Verhaltenskodex verstoßen hat, wende dich bitte an [open-source@twilio.com](mailto:open-source@twilio.com).

## Lizenzierung

Alle Drittanbieter erkennen an, dass alle Beiträge, die sie bereitstellen, unter derselben Open-Source-Lizenz erfolgen, unter der das Open-Source-Projekt bereitgestellt wird.

