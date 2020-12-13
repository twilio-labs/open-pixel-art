# Współtworzenie Open Pixel Art

¿Español? Puedes encontrar nuestra guía de contribuciones traducida en [este enlace](docs/es/CONTRIBUTING.md).

Istnieją dwa sposoby, aby przyczynić się do tego projektu. Możesz wnieść jeden piksel do kanwy lub możesz wnieść wkład do bazowego projektu. Na przykład poprzez dodanie testów, aktualizację szablonu HTML lub aktualizację dokumentacji.

W obu scenariuszach konfiguracja jest taka sama, jednak kroki wkładu różnią się nieznacznie.

## Nigdy nie współtworzyłem Open Source

![decorative banner image for TwilioQuest mission](./docs/twilio-quest-oss-banner.png)

Wkład w rozwój oprogramowania open source może na początku onieśmielać. Z tego powodu stworzyliśmy
nową misję wewnątrz [TwilioQuest](https://www.twilio.com/quest) która cię poprowadzi
krok po kroku przez tworzenie wkładu do tego projektu. Gdy już [pobrałeś grę](https://www.twilio.com/quest/download) będziesz mógł wybrać misję i
przeprowadzi ciebie ona przez każdy krok, od sklonowania projektu do utworzenia pull requesta.

Miłej zabawy z questem!

## Wymagania

- Konto na GitHub
- zainstalowany git na twoim komputerze. [Dowiedz się, jak go zainstalować](https://help.github.com/en/articles/set-up-git)
- [Node.js](https://nodejs.org) oraz menedżer pakietów taki jak [npm](https://npmjs.com)

## Skonfiguruj projekt lokalny

1. [Stwórz fork](https://help.github.com/en/articles/fork-a-repo) tego projektu
2. Zrób clone tego projektu:

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/open-pixel-art.git
```

Jeśli skonfigurowałeś to urządzenie z SSH, możesz zamiast tego zrobić to:

```bash
git clone git@github.com:<YOUR_GITHUB_USERNAME>/open-pixel-art.git
```

3. Zainstaluj zależności dla lokalnego dewelopmentu

```bash
cd open-pixel-art
npm install
```

4. Uruchom lokalny serwer programistyczny

```bash
npm start
```

5. Otwórz przeglądarkę pod adresem http://localhost:8080. Powinieneś zobaczyć tę samą treść, co na https://open-pixel-art.com tylko z siatką na canvas, która pomaga lepiej umieścić piksel.

---

Istnieje również opcja konfiguracji projektu przez Docker. Aby rozpocząć pracę z projektem przy użyciu platformy Docker, wykonaj następujące kroki.

1. Zbuduj obraz platformy Docker

```bash
 docker build -t open-pixel-art .
```

2. Uruchom obraz platformy Docker

```bash
docker run -d -p 8080:8080 -it open-pixel-art
```

Jeśli budowanie obrazu Dockera nie powiedzie się, prawdopodobnie w kodzie wystąpił błąd i testy zakończą się niepowodzeniem. Jeśli wszystko jest w porządku, możesz łatwo się połączyć, odwiedzając następujący adres URL http://localhost:8080. Powinieneś zobaczyć tę samą treść, co na https://open-pixel-art.com tylko z siatką na canvas, która pomaga lepiej umieścić piksel.

Możesz również sprawdzić, czy działa, wykonując `docker ps --all` Zobaczysz obraz o nazwie `open-pixel-art` i gdzie możesz również uzyskać do niego dostęp.

Przykład:

```bash
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                         PORTS                     NAMES
c861ba4389fe        open-pixel-art      "docker-entrypoint.s…"   7 minutes ago       Up 7 minutes                   0.0.0.0:8080->8080/tcp    sleepy_lamarr
```

## Współtworzenie Pixel

Jeśli chcesz wnieść piksel, musisz otworzyć plik [`_data/pixels.json`](_data/pixels.json). Zawiera każdy piksel umieszczony na canvas.

### Utwórz nowy piksel

Aby utworzyć nowy piksel, poszukaj przerwy między liczbami współrzędnych `x` lub `y` w tablicy `data` w środku `pixels.json`.
Po znalezieniu otwartej pozycji dodaj nowy wiersz pikseli.
Nowy piksel musi być obiektem o następujących czterech właściwościach:

- `x`: Współrzędna x twojego piksela. `0` to skrajna lewa kolumna pikseli
- `y`: Współrzędna y twojego piksela. `0` to najniższy rząd pikseli
- `color`: Kolor, który twój piksel powinien mieć jako kod szesnastkowy (np. #ff0000 dla czerwonego)
- `username`: Nazwa użytkownika GitHub, której użyjesz do utworzenia pull requestu

Wiersz dla twojego piksela powinien być posortowany najpierw według współrzędnej y, a następnie według współrzędnej x. Jeśli nie jesteś pewien swoich zmian, wprowadź je i uruchom `npm run format:sort-pixels` i powinien posortować piksel w odpowiedniej pozycji.

Zmiana powinna wyglądać następująco:

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

### Weryfikacja zmian

Po dokonaniu zmiany przejdź do http://localhost:8080 i powinieneś zobaczyć swój nowy piksel. Jeśli nie jesteś zadowolony z miejsca docelowego, zmieniaj wartości `x` i `y` a jeśli nie jesteś zadowolony z `color` możesz zmieniać właściwość `color`.

Następnie upewnij się, że wszystkie testy nadal kończą się pomyślnie, uruchamiając na innym terminalu:

```bash
npm test
```

### Tworzenia brancha i commitowanie

Gdy jesteś zadowolony ze zmian, utwórz [branch](https://help.github.com/en/articles/about-branches) abyśmy mogli zatwierdzić zmiany.

```bash
git checkout -b add-my-new-pixel
```

Następnie musisz wybrać swoją zmianę i zrobić commit, uruchamiając:

```bash
git add _data/pixels.json
git commit -m "feat(pixels): add my new pixel (x, y)"
```

Zamień `(x, y)` ze współrzędną x i współrzędną y zmienionego piksela, np. `(4, 27)`.
Spowoduje to utworzenie nowego commita z wiadomością `feat(pixels): add my new pixel (4, 27)`.
Komunikat dotyczący commita jest zgodny z [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### Wypchnij (push) swoje zmiany i utworzenie pull request

**Uwaga:** Jeśli masz problemy z przesłaniem zmian do GitHub, twój lokalny branch repozytorium może nie być aktualny z aktualnym repozytorium z powodu dodatków od innych współtwórców. Przed wysłaniem zmian do GitHub może być konieczne [zsynchronizowanie forka z repozytorium nadrzędnym](https://help.github.com/en/articles/syncing-a-fork). Spróbuj uruchomić `npm run sync-fork` aby automatycznie synchronizować fork.

Wypchnij zmiany do GitHub, uruchamiając:

```bash
git push origin add-my-new-pixel
```

Następnie przejdź do GitHub i [postępuj zgodnie z tymi instrukcjami](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) aby utworzyć pull request z forka na branch `master` z github.com/twilio-labs/open-pixel-art.

### Problemy podczas tworzenia pull requesta

Gdy wielu użytkowników jednocześnie tworzy pull requesty, aktualizacja brancha może być trudna. Najłatwiejszym sposobem na rozwiązanie tego problemu jest uruchomienie następujących poleceń, które wprowadzają wszystkie wymagane zmiany do rozwidlonego (forked) repozytorium.

Upewnij się, że masz najnowsze zmiany, uruchamiając to polecenie

```bash
npm install
```
Teraz możesz po prostu zsynchronizować go z forkiem, uruchamiając to polecenie
```bash
npm run sync-fork
```

## Przyczynianie się do innych zmian

To wspaniale, że chcesz wnieść do tego projektu więcej niż jeden piksel. Zanim zaczniesz pracować nad kodem, sprawdź, czy istnieje już [GitHub issue](https://github.com/twilio-labs/open-pixel-art/issues) dla tych zmian. Jeśli nie ma, otwórz najpierw jeden. Jeśli już istnieje, pamiętaj o utworzeniu komentarza, aby ludzie wiedzieli, że pracujesz nad rozwiązaniem tego issue.

Po wprowadzeniu zmian w kodzie wykonaj czynności opisane powyżej.

Po otwarciu pull requesta należy odkomentować sekcję dodatkowych informacji w szablonie pull requesta i dodać opis, a także odwołać się do wszelkich issues, których dotyczy.

### Wytyczne dotyczące współtworzenia dokumentacji

Proszę nie otwierać pull requesta dla nieistotnych zmian gramatycznych w pliku README lub innej dokumentacji. Tego typu wkłady nie są zgodne z duchem Hacktoberfest i nie będą akceptowane.

Przykłady niechcianych wkładów obejmują między innymi:

- dodawanie niepotrzebnych przecinków, myślników lub wykrzykników
- przeformułowanie zdań, które są już wystarczająco jasne
- zmiana pisowni z amerykańskiego angielskiego na brytyjski angielski

Te rodzaje dokumentacji są mile widziane i doceniane:

- dodawanie tłumaczeń na nowe języki
- Naprawianie uszkodzonych linków
- Naprawianie zepsutego formatowania markdown
- Poprawianie literówek lub błędnie napisanych słów

## Struktura projektu

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

### `.eleventy.js` oraz `.eleventyignore`

Projekt jest obsługiwany przez [Eleventy](https://11ty.io). To są pliki konfiguracyjne projektu

### `.mergify.yml`

Projekt używa [Mergify](https://mergify.io) aby automatycznie zmergować niektóre PR na podstawie pewnych warunków.

### `__tests__`

Ten katalog zawiera wszystkie pliki pod testy jednostkowe [Jest](https://jestjs.io).

### `_data`

Katalog `_data` zawiera plik `pixels.json` który reprezentuje każdy pojedynczy piksel w canvas, plik `defaults.json` który zawiera wartości domyślne, takie jak rozmiar canvas, oraz plik `env.js` dla wszelkich wartości związanych ze środowiskiem. Wszystkie dane będą automatycznie dostępne w pliku `index.njk`.

### `assets`

Katalog dla wszystkich statycznych assetów.

### `dangerfile.js`

Używamy [Danger](https://danger.systems/js) do wykonania pewnych kontroli przeglądu kodu. Ten plik zawiera logikę do tego.

### `index.njk`

To jest plik szablonu używany do generowania kodu HTML witryny.

### `styles`

Ten katalog zawiera wszelkie napisane niestandardowe pliki CSS. Style dla [`index.njk`](index.njk) są w [`styles/main.css`](styles/main.css)

## Kodeks postępowania

Chcemy mieć pewność, że ten projekt jest jak najbardziej przyjazny dla ludzi. Poprzez interakcję z projektem w jakimkolwiek kształcie lub formie zgadzasz się na [Kodeks Postępowania](CODE_OF_CONDUCT.md). Jeśli uważasz, że inna osoba naruszyła kodeks postępowania, zgłoś skargę na [open-source@twilio.com](mailto:open-source@twilio.com).

## Licencjonowanie

Wszyscy współtwórcy zewnętrzni przyjmują do wiadomości, że wszelkie wkłady, które przekazują, będą dokonywane na tej samej licencji open source, na której jest udostępniany projekt open source.
