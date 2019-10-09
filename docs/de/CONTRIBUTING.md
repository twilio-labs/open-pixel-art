# Beitrag zu Open Pixel Art

Es gibt zwei Möglichkeiten, wie Du zu diesem Projekt beitragen kannst. Du kannst entweder ein einzelnes Pixel zur Zeichenfläche hinzufügen oder einen Beitrag zum zugrunde liegenden Projekt leisten. Zum Beispiel durch Hinzufügen von Tests, Aktualisieren der HTML-Vorlage oder Aktualisieren der Dokumentation.

Für beide Szenarien ist der Aufbau gleich, jedoch unterscheiden sich die Beitragsschritte geringfügig.

## Ich habe noch nie zu Open Source beigetragen

Einen Beitrag zu Open Source zu leisten, kann zunächst einschüchternd sein. Aus diesem Grund haben wir eine
Neue Mission in [TwilioQuest] (https://www.twilio.com/quest), die dich
Schritt für Schritt durch das Erstellen eines Beitrags für dieses Projekt führt. Sobald Du [das Spiel heruntergeladen] hast (https://www.twilio.com/quest/download), kannst Du die Mission auswählen und Du wirst durch alle Schritte durchgeführt, vom Klonen des Projekts bis zur Erstellung deines Pull-Requests.

Viel Spaß beim Quest!

## Was Du brauchst

- Ein GitHub-Account
- Git auf Deinem Computer installiert. [Erfahre hier, wie Du es installierst] (https://help.github.com/de/articles/set-up-git)
- [Node.js] (https://nodejs.org) und ein Paketmanager wie [npm] (https://npmjs.com)

## Lokales Projekt erstellen

1. [Fork erstellen] (https://help.github.com/de/articles/fork-a-repo) dieses Projekts
2. Klone das Projekt:

`` `bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/open-pixel-art.git
`` `

3. Installieren Sie die Abhängigkeiten für die lokale Entwicklung

`` `bash
cd open-pixel-art
npm install
`` `

4. Starte einen lokalen Entwicklungsserver

`` `bash
npm start
`` `

5. Öffne Deinen Browser unter http: // localhost: 8080. Du solltest den gleichen Inhalt wie auf https://open-pixel-art.com sehen, nur mit einem Raster auf der Leinwand, mit dem Du deine Pixel besser platzieren kannst.

## einen Pixel beisteuern

Wenn Du einen Beitrag zu einem Pixel leisten möchtest, musst Du die Datei [`_data / pixels.json`] (_ data / pixels.json) öffnen. Es enthält alle auf der Leinwand platzierten Pixel.

Es gibt zwei Möglichkeiten, wie Du einen Pixel beitragen kannst.

### Option 1: Einen Pixel "beanspruchen"

Einige Einträge in der Datei `pixels.json` existieren, haben jedoch die Eigenschaft` username` von `<UNCLAIMED>`. Dies bedeutet, dass Du sie als Pixel festlegen kannst. Du kannst die Farbe nach Belieben ändern. Ändere anschließend die Eigenschaft "Benutzername" in Deinen GitHub-Benutzernamen, mit dem Du den Pull-Request öffnest.

### Option 2: Erstellen Sie ein neues Pixel

Um ein neues Pixel zu erstellen, füge dem `data`-Array in der` pixels.json` eine neue Zeile hinzu.
Ein neues Pixel muss ein Objekt mit den folgenden vier Eigenschaften sein:

- `x`: Die x-Koordinate deines Pixels. `0` ist die am weitesten links stehende Pixelspalte
- `y`: Die y-Koordinate deines Pixels. `0` ist die unterste Pixelreihe
- `color`: Die Farbe, die Dein Pixel als Hex-Code haben sollte (z. B. # ff0000 für Rot)
- `username`: Der GitHub-Benutzername, mit dem Du den Pull-Request erstellst.

Die Zeile für Dein Pixel sollte zuerst nach der y-Koordinate und dann nach der x-Koordinate sortiert werden. Wenn Du dich über deine Änderungen nicht sicher binst, nehme die Änderung vor und führe "npm run format: json" aus, und es sollte dein Pixel an der entsprechenden Position sortieren.

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

### Überprüfe Deine Änderungen

Wenn Du deine Änderung vorgenommen hast, rufe http: // localhost: 8080 auf und Du solltest dein neues Pixel sehen. Wenn Du mit der Platzierung nicht zufrieden bist, ändere die Werte "x" und "y" weiter. Wenn Du mit der Farbe nicht zufrieden bist, kannst Du die Eigenschaft "color" weiter ändern.

Stelle anschließend sicher, dass alle Tests noch bestehen, indem Du auf einem anderen Terminal ausführst:

```bash
npm test
```

### Branching und Committing

Wenn Du mit der Änderungen zufrieden bist, erstelle einen [branch] (https://help.github.com/de/articles/about-branches), damit wir die Änderungen übernehmen können.

```bash
git checkout -b add-my-new-pixel
```
Anschließend musst Du deine Änderung auswählen und mache einen Commit:

```bash
git add _data/pixels.json
git commit -m "feat(pixels): add my new pixel (x, y)"
```

Ersetze `(x, y)` durch die x-Koordinate und die y-Koordinate Deines geänderten Pixels, z.B. "(4, 27)".
Dadurch wird ein neues Commit mit der Meldung "feat (pixels): add my new pixel (4, 27)" erstellt.
Die Commitmeldung folgt dem [Conventional Commits Standard] (https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### Push Deine Änderungen und erstelle einen Pull-Requet

Wenn Du Probleme beim Übertragen Deiner Änderungen auf GitHub hast, ist Dein lokaler Branch des Repositorys möglicherweise nicht auf dem neuesten Stand, da andere Mitwirkende das Repository hinzugefügt haben. Bevor Du deine Änderungen an GitHub übertragen kannst, musst Du möglicherweise [Deinen fork mit dem Upstream-Repository synchronisieren] (https://help.github.com/de/articles/syncing-a-fork).

Übertrage deine Änderungen auf GitHub, indem Sie Folgendes ausführst:

```bash
git push origin add-my-new-pixel
```

Gehe anschließend zu GitHub und [folge diesen Anweisungen] (https://help.github.com/de/articles/creating-a-pull-request-from-a-fork), um einen Pull-Request von deinem Fork gegen den `master` branch von github.com/twilio-labs/open-pixel-art zu erstellen.

## Andere Änderungen beisteuern

Es ist großartig, dass Du mehr als ein Pixel zu diesem Projekt beitragen möchtest. Bevor Du mit der Arbeit am Code beginnst, überprüfe, ob bereits ein [GitHub-Problem] (https://github.com/twilio-labs/open-pixel-art/issues) für diese Änderungen vorliegt. Wenn nicht, öffne bitte zuerst eines. Wenn es bereits eines gibt, stelle sicher, dass Du einen Kommentar erstellst, um die Leute darüber zu informieren, dass Du an einer Lösung für dieses Problem arbeitest.

Befolge nach dem Ändern des Codes die oben beschriebenen Schritte.

Wenn Du einen Pull-Request öffnest, musst Du den Abschnitt mit den zusätzlichen Informationen in der Pull-Anforderungsvorlage auskommentieren und eine Beschreibung hinzufügen sowie auf Probleme verweisen, die hiermit behoben werden.

## Projekt Struktur

```
pixel-project-dev
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

Das Projekt wird von [Eleventy] (https: / / 11ty.io) betrieben. Dies sind die Konfigurationsdateien für das Projekt.

### `.mergify.yml`

Das Projekt verwendet Mergify, um bestimmte PRs basierend auf bestimmten Bedingungen automatisch zusammenzuführen.

### `__tests__`

Dieses Verzeichnis enthält alle [Jest] (https://jestjs.io) -gesteuerten Komponententests

### `_data`

Das Verzeichnis "_data" enthält die Datei "pixels.json", die jedes einzelne Pixel auf der Zeichenfläche darstellt, eine Datei "defaults.json", die Standardwerte wie die Größe der Zeichenfläche enthält, und die Datei "env.js" für Beliebige umweltbezogene Werte. Alle Daten stehen automatisch in der Datei "index.njk" zur Verfügung.

### `assets`

Ein Verzeichnis für statische Assets.

### `dangerfile.js`

Wir verwenden [Danger] (https://danger.systems/js), um einige Codeüberprüfungen durchzuführen. Diese Datei enthält die Logik dafür.

### `index.njk`

Dies ist die Vorlagendatei, mit der der HTML-Code der Website generiert wird.

### `styles`

Dieses Verzeichnis enthält benutzerdefiniertes CSS. Die Stile für [`index.njk`] (index.njk) befinden sich in [` styles / main.css`] (styles / main.css)

## Code of Conduct

Wir möchten sicherstellen, dass dieses Projekt so freundlich wie möglich ist. Durch die Interaktion mit dem Projekt in beliebiger Form stimmen Sie dem [Verhaltenskodex] des Projekts (CODE_OF_CONDUCT.md) zu. Wenn Sie der Meinung sind, dass eine andere Person gegen den Verhaltenskodex verstoßen hat, wenden Sie sich bitte an [open-source@twilio.com] (mailto: open-source@twilio.com).

## Lizenzierung

Alle Drittanbieter erkennen an, dass alle Beiträge, die sie bereitstellen, unter derselben Open-Source-Lizenz erfolgen, unter der das Open-Source-Projekt bereitgestellt wird.
