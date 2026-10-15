# Marketizzati — nuovo sito multilingua

Codice del nuovo sito di **Marco Villalva, sviluppatore freelance**, ricostruito dalla direzione grafica preparata in Figma. Logo originale, foto di Marco, fondo chiaro/grafite, accento rosso-arancio e font DM Sans.

Il file Figma è incompleto per il limite del connettore. Questo progetto riprende le homepage definite e completa autonomamente le pagine interne: non è un'esportazione automatica del file.

**Stato: anteprima da revisionare. Nessuna pubblicazione e nessuna modifica al sito online.**

## Avvio in Antigravity

Serve **Node.js 22 o successivo**. Non ci sono dipendenze npm da installare.

```bash
git clone https://github.com/villalvawebdesigner-gif/marketizzati-web.git
cd marketizzati-web
npm run dev
```

Apri **http://127.0.0.1:4173/it/**. Per vedere le altre lingue usa il selettore IT / EN / ES. Le modifiche al codice richiedono una nuova build (`npm run build`) e l'aggiornamento della pagina. Per fermare il server: Ctrl+C.

## Cosa contiene

- 11 pagine per lingua: Home, Servizi, Sviluppo web, Web app, Automazioni, Progetti, Lurumi, Chi sono, Contatti, Risorse e una guida sulle automazioni.
- **33 pagine commerciali/editoriali** complete in italiano, inglese e spagnolo, più 9 documenti legali importati dal sito esistente e una pagina 404.
- HTML statico già completo, responsive, menu mobile, FAQ espandibili e demo di automazione.
- Il cambio lingua mantiene il tipo di pagina e usa URL localizzati.
- Modulo brief con validazione: prepara un messaggio da copiare in WhatsApp. **Non invia dati, non invia email e non simula conferme di consegna.**
- Title e description distinti, canonical, hreflang reciproci, sitemap, robots.txt, Open Graph e dati strutturati JSON-LD.
- Font locali con licenza OFL e copertine social 1200 × 630 per ogni lingua.

## Dove modificare

| File | Contenuto |
|---|---|
| `src/locales.mjs` | Testi IT/EN/ES e percorsi delle pagine |
| `scripts/build.mjs` | Template HTML, componenti e generazione SEO |
| `public/assets/style.css` | Colori, tipografia, layout e breakpoint |
| `public/assets/app.js` | Menu, demo e modulo brief |
| `site.config.mjs` | Dominio, nome, lingue e contatto WhatsApp |
| `src/policies/` | Documenti legali originali da revisionare |
| `docs/HANDOFF.md` | Fonti, limiti della verifica e passaggio alla produzione |

## Comandi

```bash
npm run build             # genera dist/ in modalità anteprima (noindex)
npm run preview           # serve la build già generata
npm test                  # build + controlli automatici
npm run check             # sintassi JS + test
npm run build:production  # build indicizzabile, dopo revisione dei documenti legali
```

Il risultato completo è nella cartella **`dist/`**, ricreata a ogni build e non inclusa in Git. Si può caricare su un hosting statico; sono generati `.htaccess`, `_headers` e `_redirects` per i provider che supportano questi formati. Non includere i sorgenti o file privati nella directory pubblica del server.

## Prima della pubblicazione

La build normale contiene `noindex` nelle pagine e nei file degli header per evitare l'indicizzazione dell'anteprima. `robots.txt` permette la lettura delle pagine: è necessario per vedere la direttiva `noindex`.

I documenti legali del sito precedente citano banner/cookie e servizi non presenti in questo progetto; i corpi delle versioni EN/ES sono in gran parte in italiano e i termini contengono `[sede legale]`. Sono conservati come materiale di migrazione, **non come testi approvati per il nuovo sito**. Completarli e tradurli, poi impostare `legalReviewed: true` in `site.config.mjs` per abilitare la build di produzione.

Controllare dominio finale, contatti, contenuti del caso Lurumi e reindirizzamenti delle vecchie pagine. Dopo il deploy verificare i codici HTTP, l'assenza di `noindex` e inviare la sitemap a Search Console. L'implementazione SEO non garantisce posizioni in SERP.

## Design e proprietà

Riferimento: https://www.figma.com/design/m3lU5SX98LO0Gp5pj3ZNog

Logo, foto e testi legali provengono dal sito Marketizzati fornito per il rifacimento. Non è assegnata una licenza open source al codice o ai contenuti del brand. La licenza del font è in `public/assets/fonts/OFL-DM-Sans.txt`.
