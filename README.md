# Music Me

I dette prosjektet var oppgaven å lage en prototype av en katalog hvor brukeren skal blant annet kunne søke, filtrere og sortere. Vi har valgt å lage applikasjonen **Music Me**, som er et system hvor en bruker kan legge til sanger som vedkommende har hørt på, metadata og rangeringer.

## Oppstart av prosjektet

Prosjektet er delt i to deler, en server som er implementert i NodeJS og som bruker Express for å lage et REST-API og Sequelize for databasehåndtering, og en klient-applikasjon. Serveren kjører på en virtuell server, og alt er satt opp til å fungere [her](t2810-45.idi.ntnu.no/prosjekt4). **Det er bare å bruke denne siden, men rydd gjerne opp etter deg hvis du for eksempel legger til nye sanger - databasen her deles av alle som skal rette prosjektet!** Det er selvsagt også mulig å sette opp prosjektet lokalt, som beskrevet under.

Serveren lever i mappen `server`. Etter å ha navigert til denne mappen, må du kjøre `npm install` for å installere alle pakkene som trengs for dette prosjektet. Deretter anbefaler vi at du kjører `npm run populate` hvis dette er første gang du starter prosjektet da dette legger til testdata i databasen. Databasen skal ikke trenge videre konfigurasjon, da prosjektet bruker SQLite. Etter dette, kan prosjektet startes ved å kjøre `npm start`.

Prosjektet vårt har også en god del enhetstester med Jest og Enzyme, samt end-to-end testing via Cypress. Disse testene befinner seg i mappen `client`. Etter å ha navigert til denne mappen, kan enhetstestene kjøres ved å skrive `npm test`. 

For å kjøre end-to-end testene våre, kan du kjøre `npm run cytest`, som kjører testene i konsollen. Du kan også kjøre `npm run cy` for å åpne det fullstendige Cypress-kontrollpanelet. Merk at for å kunne kjøre Cypress, må klienten være tilgjengelig på `localhost:3000` og serveren på `localhost:8000`, som er standardportene når du starter prosjektet med mindre de er opptatte. Vi anbefaler også å kjøre `npm run populate` før start i server-mappen. Cypress bruker din lokale database under testingen.

Enhetstestene våre ligger i undermapper kalt `tests` ved siden av komponentene de tester.  Testene som bruker Cypress angår generelt sett mange flere komponenter samtidig, så disse ligger i en egen mappe, `client/integration`.

### Kjøring av prosjektet i produksjon

De følgende kommandoene ble brukt for å sette opp prosjektet på produksjonsserveren.

```
ssh torjusti@it2810-45.idi.ntnu.no
git clone https://gitlab.stud.idi.ntnu.no/it2810-h18/prosjekt3/gruppe45.git
cd gruppe45/server
npm install
npm run populate
npm run build
forever start dist/index.js
cd ../client
npm install
export REACT_APP_API_DOMAIN=http://it2810-45.idi.ntnu.no:8000
npm run build
cp -r build/* /var/www/html/prosjekt4
```

Hvis det for en eventuell sensor eller faglærer blir noen problemer med serveren, kan den startes på nytt ved å kjøre kommandoene vist over. Det er `forever start build/index.js` som starter serveren. Husk å bruke ditt eget brukernavn for å komme inn på serveren. Det klonede git-repoet ligger under brukernavnet `torjusti`, men det går fint å klone repoet på nytt hvis nødvendig.

## Innhold og funksjonalitet

Nettsiden er en prototype av et produkt, og følgelig vil et ferdig produkt måtte ha mer funksjonalitet og sannsynligvis et forbedret design. Videre hadde det vært lurt å forbedre interaksjonsdesignet vårt gjennom brukersentrerte metoder. For å avgrense oppgaven vår bestemte vi oss for å ha en musikkdatabase med fokus på sanger, med mulighet for søk, filtrering og sortering. **Det er tiltenkt at applikasjonen skal brukes av kun en bruker. Dette er altså en personlig musikkdatabase. Et endelig produkt hadde også inkludert muligheter for registrering og pålogging av brukere, men dette utgår siden dette er en prototype.**

Sangene presenteres til brukeren i form av en tabell. Her er det lagt opp til håndtering av store resultatsett ved at brukeren kan bla mellom sider i tabellen i kontrollpanelet over tabellen. Brukeren kan trykke på alle sanger i tabellen for å se mer detaljert informasjon om sangen. Her kan brukeren gi en ny stjernevurdering, eller endre på informasjonen om sangen. I tillegg til å endre på sanger har vi valgt å implementere muligheten for brukeren til å legge til nye sanger i listen. Dette gjøres ved at brukeren fyller ut et skjema. Knappen for å nå dette skjemaet er tilgjengelig under tabellen.

I oppgaven var det valgfritt å implementere en alternativ avansert visning for data. Vi har ikke implementert dette, men vi mener vi har en relativt komplisert front-end med mulighet for å legge til, rate og redigere sanger. I tillegg har vi laget vårt eget REST API uten å samarbeide med andre grupper. 

Det er flere muligheter for søk, filtrering og sortering i applikasjonen vår, og  det er mulig å kombinere mellom disse. Dette foregår på serveren, og man får dermed søkt i hele datasettet og ikke bare det som vises for brukeren i tabellen. Disse mulighetene er beskrevet i større detalj under.

### Filtrering

Det er mulig å filtrere basert på sangenes rating. Knappen i sidebaren aktiverer dette. Når dette er aktivert kan man bruke slideren for å sette en grense for hvilke sanger som skal vises, basert på deres rating. Kun sanger med rating større enn eller lik denne verdien vil vises.

Den andre måten å filtrere på er basert på sjanger. Ved å huke av sjangre i sidebaren, vil kun sanger i de markerte sjangrene vises. Når ingen sjangre er markert, vil sanger fra alle sjangre kunne vises. Listen med sjangre er alle de distinkte sjangrene som eksisterer i databasen, og brukeren kan således fritt lage nye ved å legge til nye sanger.

### Sortering

Det er mulig å sortere resultatet i tabellen, enten alfabetisk på en av kolonnene, eller numerisk på rating. Dette gjøres ved å klikke på kolonneoverskriftene. Et klikk her vil alternere mellom å sortere stigende, synkende og ingen sortering.

### Søking

På toppen av siden ligger et søkefelt. Søking fungerer ved at man skriver inn i søkefeltet, og trykker på søkeknappen eller ENTER. Når man gjør dette, vil kun sanger som matcher søkeresultatet vises. Ved å fjerne teksten og klikke enter, vil man ikke lengre søke, og alle sanger vil kunne vises igjen.

Vi har brukt [Lunr](http://lunrjs.com) som motor bak søkefunksjonaliteten vår. Denne søkealgoritmen vil fjerne såkalte stopwords som **the** og **you** som ofte forekommer i engelske setninger. Deretter utføre søket. I et ordentlig prosjekt ville vi gjerne brukt Elasticsearch eksempelvis for robust søkehåndtering, men vi har valgt å ikke gjøre dette i vårt prosjekt for å holde kompleksiteten nede i henhold til tidsfrist og oppgavekrav da dette er en prototype.  

## Teknologi

Prosjektet bruker React og er satt opp med `create-react-app`. Vi har brukt UI-rammeverket [Semantic UI](https://react.semantic-ui.com) for å spare arbeid med styling, og for å sikre et konsistent design. I tillegg til dette, har vi brukt en rekke andre pakker for å lette utviklingen vår. En utfordring vi oppdaget med dette rammeverket var at det er vanskelig å overstyre stylingen til komponentene med egen CSS. I stedet for å bruke `!important` og lignende, har vi her fulgt prosjektutviklerenes anbefaling med å implementere egne komponenter der hvor funksjonaliteten avviker for mye fra det Semantic UI tilbyr. 

For CSS  har vi satt opp CSS modules. Dette er veldig enkelt å sette opp og ligner veldig mye på vanlig CSS, men det har den fordelen at klassenavn scopes slik at de er koblet sammen med et komponent. Dette gjorde det enkelt for oss å utvikle CSS uten at klassenavn kom i konflikt med styling fra andre steder i prosjektet.

På serveren har vi implementert et enkelt REST API med endepunkter for å hente ut, legge til, oppdatere, rangere og slette sanger. De tre siste endepunktene fungerer relativt standard ved at man sender JSON til serveren på ett av endepunktene til vårt API. Det første endepunktet for å hente ut data tar mange forskjellige parametre for å implementere filtrering funksjonaliteten. Vi har en løsning hvor klienten lar brukeren konfigurere hvilke sanger som skal vises ved hjelp av søkefeltet, sorteringsinnstillinger, filtreringsfunksjonalitet osv. Denne konfigurasjonen sendes med til endepunktet for å hente ut ny informasjon når ny informasjon skal hentes inn i tabellen. Dette skjer når for eksempel når man blar mellom sidene, oppdaterer sanger, rangerer sanger, søker e.l..

Serveren bruker Express og Node, og vi bruker Sequelize for å håndtere databasen. Sequelize er en såkalt ORM, og vi mente dette var hensiktsmessig å bruke, da det er betydelig enklere å bruke enn ren SQL. Den faktiske databasen er SQLite, som vi valgte da det er veldig enkelt å sette opp med tanke på utvikling. Serveren er relativt liten og forståelig. Vi har separate filer for forskjellige endepunkter, samt litt konfigurasjon. Vi har satt opp Babel på serveren for å kunne skrive ES6 også der.

Vi har en relativt standard struktur på prosjektet vårt. Under er en ikke-fullstendig oversikt over de forskjellige mappene og filene våre, og hva de gjør.

```
├── client
│   ├── package.json - Dependencies for prosjektet
│   ├── public - Statiske filer som brukes av CRA
│   └── src - Applikasjonsfilene våre
│       ├── App.js - Rotkomponentet til applikasjonen
│       ├── common
│       │   └── api.js - Hjelpefunksjoner for å kalle på vårt API
│       ├── components
│       │   ├── AddSong - Mappe med komponenter for å legge til sanger
│       │   ├── DataLoader - Mappe med komponenter rundt datalasting
│       │   ├── Details - Mappe med komponenter rundt detaljvisningen
│       │   ├── Header - Mappe med komponenter for headeren
│       │   ├── SearchField - Mappe med komponenter for søkefunksjonaliteten
│       │   ├── SidePanel - Mappe med komponenter for filtreringsfunksjonaliteten
│       │   ├── Table
│       │   │   ├── DataTable.js - Selve tabellen som viser sanger
│       │   │   ├── Pagination.js - Knappene for å bla mellom sidene
│       │   └── Toast - Komponenter for å vise toastnotifikasjoner
│       ├── features - Inneholder Redux-relatert kode
│       │   ├── rootSaga.js - Fil for å kjøre alle sagaene
│       │   ├── musicApp.js - Hovedreduceren i prosjektet
│       │   ├── genres - Kode for å håndtere sjangre
│       │   ├── loadingError - Kode for å vise feilmelding
│       │   ├── order - Filer for å håndtere sortering
│       │   ├── pagination - Filer for å håndtere pagination
│       │   ├── rating - Filer for å håndtere rangering
│       │   ├── search - Filer for å håndtere søking
│       │   ├── songs
│       │   │   ├── actions.js - Actions for å endre, laste sanger og så videre
│       │   │   ├── reducers.js - Reduceren som håndterer sanger
│       │   │   └── sagas.js - Håndterer en stor mengde side-effects, altså kommunikasjon med serveren
│       │   └── toasts - Filer for å håndtere toasts
│       ├── integration - Inneholder integrasjonstester
│       ├── setupTests.js - Konfigurasjon for Enzyme
│       └── store.js - Konfigurasjon for Redux
└── server
    ├── dist - Kompilerte filer fra Babel, autogenerert
    └── src
        ├── database.js - Databasetilkoblingen
        ├── index.js - Starter applikasjonen
        ├── models.js - Databasemodeller
        ├── populateDatabase.js - Script for å legge til testdata i databsen
        ├── routes - Forskjellige endepunkter
        │   ├── genres.js
        │   └── songs
        │       ├── delete.js
        │       ├── getAll.js
        │       ├── get.js
        │       ├── index.js
        │       ├── post.js
        │       ├── put.js
        │       └── rate.js
        └── search.js - Søkeindeksering
```

For state management i dette prosjektet har vi benyttet Redux for state management. Her håndterer vi mye av den client-side logikken for å takle paginering, søking, filtrering osv. Utfordringen kommer med at den faktiske søkingen, pagineringen, filtreringen og sorteringen må skje på serveren og ikke på klienten. Vi ønsket også å holde data-lastingen action-basert og tett knyttet opp mot redux, men vi ville også ha pure reducers - det å for eksempel laste data i fra reducere er generelt dårlig practice. Derfor måtte vi ha en alternativ måte å håndtere såkalte side-effects på. Et populært valg her er Redux Thunk, men vi valgte å bruke Redux Saga da det er et veldig kraftig verktøy som tillater kompleks håndtering av side effects. Redux Saga lar deg for eksempel veldig enkelt håndtere kansellering - hvis man fyrer av to requester nær hverandre, for eksempel ved å klikke til høyre i kontrollpanelet for blaing av sider to ganger, vil Redux Saga enkelt kunne settes opp til å avbryte den første requesten, slik at det ikke blir noen race condition med hvilken request som fullfører først her. Vi har ikke sett at man skal lage noen tutorial i denne fila, men derimot er [hjemmesiden](https://redux-saga.js.org/) til prosjektet en kort og konsis introduksjon til hvordan dette brukes.

Det meste av Redux-relatert funksjonalitet i prosjektet vårt ligger i mappen `features`. Her har vi puttet relaterte actions, reducers og sagas i samme mappe, da vi mener dette er en struktur som passer prosjektet vårt godt. Det er også en av mange anbefalte prosjektstrukturer - det er ikke akkurat noen one-size fits all i React-verdenen.

## Testing

Vi har konfigurert GitLab CI, som automatisk kjører enhetstestene og end-to-end-testene våre. Dette er nyttig, blant annet siden det er en slags autoritet på kodekvaliteten vår og en ekstra sikring når vi reviewer merge-requester.

For enhetstester har vi valgt å bruke Jest og Enzyme. Jest fungerte veldig godt for oss i forrige prosjekt og Enzyme gjør det enda enklere for oss å skrive meningsfulle tester. Vi har også brukt Cypress for end-to-end-testing.

## Git og Gitlab

I dette prosjektet måtte vi bruke GitLab i stedet for GitHub. I dette prosjektet har vi i stor grad brukt en prosess som ligner den vi brukte med GitHub.

Vi har brukt issues flittig i utviklingen. Hver issue representerer en task som må gjøres i prosjektet. Vi har valgt å benytte GitLab sine boards fordi det gjør det lett å holde oversikten over alle issuenes progresjon. Alle issues vi mener må bli gjort i prosjektet ligger under **Todo** eller en av kolonnene til høyre for den. Issues under **Open** mener vi ikke er kritisk å få på plass da det er ting som kunne vært fint å ha som vi har plukket i fra når vi hadde tid. Når en issue er merged, flyttes issuen til **Closed**. Gitlab har også et tilordningssystem som vi har tatt i bruk, men man kan bare tilordne en person til en issue selv om det er flere som jobber med det og vi har da bare valgt en person som har hovedansvaret i dette tilfellet.

Hver commit er indirekte koblet via en task, ved at hver commit kommer fra en branch som er koblet til en issue. Sammenkoblingen mellom branch og issue er at hver issue har en tilsvarende branch med navn på formen `feat-#1-table` som står for at det er en feature som beskrives i issue 1 og handler om en tabell.













