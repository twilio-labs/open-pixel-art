# Come contribuire a Open Pixel Art

Ci sono due modi per contribuire a questo progetto. Si può contribuire aggiungendo o modificando un pixel nel canvas, oppure si può contribuire al progetto stesso, ad esempio aggiungendo test, aggiornando l'HTML o la documentazione.

Per entrambi gli scenari la configurazione è la stessa, ma i passaggi per contribuire sono diversi.

## Se non avete mai contribuito all'open source prima d'ora

![immagine decorativa del banner per la missione TwilioQuest](../twilio-quest-oss-banner.png)


Contribuire all'open source può intimorire. Proprio per questo motivo, abbiamo creato una nuova missione su [TwilioQuest](https://twil.io/hacktoberfest-quest) che vi guiderà
passo dopo passo per creare un contributo a questo progetto. Dopo aver [scaricato il gioco](https://www.twilio.com/quest/download), sarà possibile scegliere la missione e la modalità di gioco.
vi guiderà attraverso tutti i passi necessari, dalla clonazione del progetto alla creazione della richiesta di pull.

Godetevi l'avventura!

## Requisiti

- Un account GitHub
- Avere installato git sul proprio computer. [Scopri qui come installarlo](https://help.github.com/en/articles/set-up-git)
- Node.js](https://nodejs.org) e un gestore di pacchetti come [npm](https://npmjs.com)

## Impostazione del progetto in locale

1. [Creare un fork](https://help.github.com/en/articles/fork-a-repo) di questo progetto
2. Clonare il progetto eseguendolo nel terminale:

```
bash
git clone https://github.com/<YOUR_USER_DE_GITHUB>/open-pixel-art.git
```

3. Installare le dipendenze per lo sviluppo locale:

```
bash
cd open-pixel-art
installare npm
```

4. Avviare il server di sviluppo locale:

```
bash
npm start
```

5. Aprite il vostro browser e andate su http://localhost:8080. Dovreste vedere lo stesso contenuto di https://open-pixel-art.com, ma questa versione avrà una griglia che vi aiuterà a visualizzare meglio la tela e a localizzare più facilmente i vostri pixel.

## Contribuire a un pixel

Se si vuole contribuire con un pixel, è necessario modificare il file che risiede in [`_data/pixels.json`] (_data/pixels.json). Questo file contiene tutti i pixel attualmente presenti nell\'area di disegno.

Esistono due modi diversi per contribuire a un pixel:

### Opzione 1: dichiarare il proprio pixel esistente.

Ci sono alcuni pixel che esistono già nel file `pixels.json`, ma nella proprietà `username` hanno un valore di `<UNCLAIMED>`. Ciò significa che è possibile modificare il valore e renderlo proprio, nonché cambiare il colore a piacimento. Dopo aver apportato questa modifica, è necessario aggiornare la proprietà username e cambiarla con il proprio nome utente GitHub, che dovrebbe essere lo stesso con cui si aprirà la richiesta di pull.

### Opzione 2: Creare un nuovo pixel

Per creare un nuovo pixel, aggiungere una nuova riga all'array `data` all'interno di `pixels.json`.
Ogni nuovo pixel deve essere un oggetto che deve contenere le seguenti quattro proprietà:

- `x`: la coordinata x del pixel. `0` rappresenta la colonna più a sinistra della tela.
- `y`: la coordinata y del pixel. `0` rappresenta la riga più bassa della tela.
- `colore`: il colore del pixel, in formato esadecimale (esempio: #ff0000 per il rosso).
- `username`: l\'utente GitHub che si utilizzerà per aprire la richiesta di pull.

La riga del pixel terrà conto prima della coordinata `y` e poi della coordinata `x`. Se non si è sicuri delle modifiche, si possono fare ed eseguire `npm run format:json` e questo aggiusterà il pixel nella giusta posizione.

La modifica finale dovrebbe assomigliare a questa (sostituendo dkundel con il vostro utente GitHub):

```diff
{
  "data": [
    {"y": 1, "x": 3, "color": "#F22F46", "username": "twilio-labs"},
    { "y": 1, "x": 4, "color": "#FFFF00", "username": "dkundel"},
    {"y": 2, "x": 9, "color": "#F22F46", "username": "twilio"},
    ...
  ]
}
```

### Come convalidare le modifiche

Dopo aver effettuato la modifica, si dovrebbe vedere il nuovo pixel quando si apre http://localhost:8080 nel browser. Se non si è soddisfatti della posizione, si possono continuare a regolare i valori `x` e `y` fino a trovare il posto giusto e se si deve regolare il colore, si può fare lo stesso, ma cambiando la proprietà `colour` dell\'oggetto.

Infine, si può verificare che le modifiche siano corrette eseguendo i test e controllando che siano ancora tutti validi. È possibile eseguire questa operazione in un nuovo terminale, eseguendo:

```
bash
npm test
```

## Creare un ramo e salvare le modifiche in un commit

Una volta che si è soddisfatti delle modifiche e che queste sono state convalidate, creare un [ramo](https://help.github.com/en/articles/about-branches) per poter salvare le modifiche.

```
bash
git checkout -b add-my-new-pixel
```

Quindi, salvare le modifiche eseguendo il seguente comando:

```
bash
git add _data/pixels.json
git commit -m "feat(pixels): aggiunto il mio nuovo pixel"
```

Questo creerà un nuovo commit con il messaggio `feat(pixels): add my new pixel`. Questo messaggio di commit è regolato dal [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### Come caricare le modifiche e aprire una richiesta di pull

Caricare le modifiche su GitHub eseguendole nella console:

```
bash
git push origin add-my-new-pixel
```

E poi [seguire queste istruzioni](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) per aprire una richiesta di pull dal proprio fork al ramo `master` di github.com/twilio-labs/open-pixel-art.

## Come contribuire ad altre modifiche

Grazie per il vostro interesse a contribuire con altre modifiche a questo progetto. Prima di iniziare a lavorare sul codice, verificare se esiste un [issue su GitHub](https://github.com/twilio-labs/open-pixel-art/issues) per queste modifiche. Se non c\'è, vi prego di aprirne uno. E se ne esiste già uno, lasciate un commento per farci sapere che state lavorando a questa modifica.

Dopo aver apportato le modifiche, seguite i passaggi elencati sopra per versare il contributo.

Quando si apre la richiesta di pull, assicurarsi di decommentare la sezione "additional info" nella descrizione della richiesta di pull, aggiungere i dettagli delle modifiche e un riferimento al problema correlato.

## Struttura del progetto

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

### `.eleventy.js` e `.eleventyignore`.

Questo progetto utilizza [Eleventy](https://11ty.io). Questi sono i file di configurazione del progetto.

### `.mergify.yml`.

Questo progetto utilizza [Mergify](https://mergify.io) per includere automaticamente alcune PR, in base a condizioni definite internamente.

### `__test__`

Questa cartella contiene tutti i test unitari e si usa [Jest](https://jestjs.io) per eseguirli.

### `_dati`

La cartella `_data` contiene il file `pixels.json` che rappresenta ogni pixel esistente nel canvas, un file `defaults.json` che contiene alcuni valori predefiniti, come le dimensioni del canvas, e un file `env.js` con i valori relativi agli ambienti dell'applicazione. Tutti i dati saranno automaticamente disponibili nel file `index.njk`.

### `attività`

Questa directory contiene risorse statiche.

## `dangerfile.js`

Questo progetto utilizza [Danger](https://danger.systems/js) per alcune convalide e revisioni del codice. Questo file contiene la logica per farlo.

### `index.njk`

Questo è il file del modello che usiamo per generare l'HTML del sito.

### `stili`

Questa cartella contiene tutti gli stili personalizzati. Gli stili di [`index.njk`](index.njk) sono in [`styles/main.css`](styles/main.css).

## Codice di condotta

Vogliamo che questo progetto sia il più amichevole e accogliente possibile. Se interagite con questo progetto in qualsiasi modo, accettate di adottare e rispettare il [Codice di condotta] del progetto (CODE_OF_CONDUCT.md). Se ritenete che qualcuno coinvolto in questo progetto abbia compiuto azioni che violano il presente Codice di condotta, siete pregati di comunicarcelo inviando un'e-mail a [open-source@twilio.com](mailto:open-source@twilio.com), in modo che possiamo prendere i provvedimenti del caso.

## Licenza

Tutti i contributi apportati saranno integrati sotto la stessa licenza open source utilizzata da questo progetto.
