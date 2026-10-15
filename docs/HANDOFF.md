# Consegna tecnica

## Architettura

Generatore statico Node.js senza dipendenze esterne. Ogni URL produce una pagina HTML completa: nessun router client necessario per mostrare i contenuti. Il JavaScript aggiunge le interazioni; navigazione, contenuti e FAQ rimangono utilizzabili senza JS. Il contatto WhatsApp rimane disponibile anche senza JS.

La cartella `dist` è destinata all'hosting. Il server locale serve a provare il progetto, non è il server di produzione. Non sono presenti database, credenziali, analytics, cookie applicativi o memorizzazione dei moduli.

## Elementi ripresi dal progetto Figma

- Fondo `#F4F3EF`, grafite `#1B1E21`, accento `#D83B17`, superfici `#E8EAE3`.
- DM Sans per titoli e testi, font di sistema monospaziato per etichette tecniche.
- Hero a due colonne con flusso di automazione illustrativo; sviluppo, web app e automazioni come tre aree.
- Progetto Lurumi, processo in quattro passi, presentazione di Marco, FAQ e contatto.
- Adattamento mobile a colonna singola. I layout interni sono un completamento del concept, non schermate esportate da Figma.

## Fonti e contenuti

Verificate il 15 ottobre 2026:

- Sito originale: https://www.marketizzati.it/it
- Logo: `/images/icon-light.png` (solo ottimizzazione di formato/dimensioni, senza ridisegno).
- Foto: `/images/Chi%20sono.jpg` (versione ottimizzata WebP).
- Contatto WhatsApp collegato dal sito: https://wa.link/psnpym
- Policy: percorsi `/{it,en,es}/{privacy,cookie,termini}`. Conservate in `src/policies`; da aggiornare e tradurre prima della pubblicazione. Non aggiungere un banner per dichiarare strumenti di tracciamento che il codice non usa.
- Lurumi: progetto menzionato dal sito attuale. La grafica della scheda è una presentazione editoriale, non uno screenshot del prodotto. Nessuna statistica, testimonianza o risultato commerciale inventato.
- Le guide e le descrizioni dei servizi sono nuovi contenuti proposti per il riposizionamento.

## Interazioni

- Menu mobile: apertura, chiusura, Escape e aggiornamento di `aria-expanded`.
- FAQ: elementi nativi `details` e `summary`.
- Demo: tre passi animati, ripetibili, con stato annunciato e rispetto di `prefers-reduced-motion`; nessuna API reale.
- Brief: campi etichettati, email valida, testo minimo di 10 caratteri, anteprima, copia con fallback alla selezione e ritorno alla modifica. L'utente copia e invia il testo in WhatsApp; nessun messaggio parte automaticamente.

## SEO e migrazione

Il dominio canonico si configura in `site.config.mjs`. Ogni pagina ha canonical e hreflang per le pagine equivalenti; `x-default` punta alla versione italiana corrispondente. La root redirige all'italiano senza geolocalizzazione forzata. Nessuna keyword nascosta o file `llms.txt` presentato come garanzia di visibilità.

JSON-LD: Person, WebSite, WebPage, Service sulle pagine di servizio, Article sulla guida e BreadcrumbList. Nessun rating, recensione o rich result garantito.

I redirect inclusi coprono la root e alcune vecchie pagine di servizio/legali. Prima del passaggio dal sito esistente, esportare gli URL effettivi da sitemap/Search Console e completare la mappa: i vecchi anchor come `/it#chi-sono` non vengono gestiti da redirect server perché il frammento non viene inviato al server.

## Verifica

`npm run check` verifica sintassi, generazione, 42 pagine, titoli univoci, heading, lingua, file locali, URL, metadati, JSON-LD, sitemap, font, immagini social e modalità noindex.

In questa sessione non è disponibile la verifica grafica automatizzata in un browser supportato. Prima del deploy controllare visivamente in Antigravity le larghezze 390, 768 e 1440 px; provare menu, cambio lingua, FAQ, demo e brief. Il codice non è stato pubblicato su un hosting.
