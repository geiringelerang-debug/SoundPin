# SoundPin

En tjeneste som leser opp historier om nærmiljøet mens du beveger deg ute.

## Versjon 2

Web-appen (`index.html`) kjører på GitHub Pages og bruker Firebase til innlogging, lagring og lyttescore.

- **Lytte:** kart med spor, kategorifilter, varmekart (🔥), gå-modus som spiller spor som ligger foran deg, og bilmodus som slår seg på automatisk over ca. 25 km/t.
- **Lyttescore:** andelen som hører et spor ferdig, der lyttinger mister halve vekten etter 30 dager. Nye spor får ekstra synlighet i 14 dager, og et svar gir sporet ny synlighet i 7 dager. Høy score gir større og tydeligere markør.
- **Lage spor:** opptak (maks 90 s, 5 min for autoriserte) eller tekst som leses opp med telefonens stemme, med bilde, kategorier og plassering.
- **Deling:** bare meg, venner (de som har åpnet invitasjonslenken din) eller alle. Nye brukere kan dele med venner; deling med alle krever autorisert status.
- **Skjulte spor:** vises ikke i kartet, men dukker opp når du er innen 40 m, eller når du har hørt forrige spor i samme sekvens.
- **Sekvenser:** spor med sekvensnummer. Retningen beregnes fra rekkefølgen, og sporene spilles bare når du beveger deg samme vei.
- **Svar, egne ikoner, rapportering, verifisering og roller.** Administrator (`ADMIN_EMAIL`) gir roller i profilen.

Begrensning: i en nettleser stopper posisjon og avspilling når skjermen slås av. Det krever et app-skall (senere versjon).

### Oppsett i Firebase

1. Lim konfigurasjonen fra web-appen inn i `firebase-config.js`.
2. **Authentication → Sign-in method:** slå på *Anonymous* og *Google*.
3. **Authentication → Settings → Authorized domains:** legg til `geiringelerang-debug.github.io`.
4. **Firestore → Rules:** lim inn `firestore.rules` og publiser.
5. **Storage → Rules:** lim inn `storage.rules` og publiser.

Nye data ligger i samlingene `sp_users`, `sp_tracks`, `sp_stats` og `sp_reports`, og filer under `sp/<bruker-id>/` i Storage. De gamle samlingene `pins` og `users` brukes ikke av web-appen.

## Data

Lydfilene og bildene ligger i Firebase Storage (`soundpin-50207.appspot.com`). Repoet inneholder bare oversikter med offentlige lenker:

| Fil | Innhold |
|---|---|
| `data/pins.json` | **1 267 pins** fra Firestore: navn, beskrivelse, posisjon, tagger, lenke til lyd og bilde |
| `data/audio.json` | Alle 1 971 lydfiler i Storage (.m4a, ca. 196 MB), innspilt mars 2022 – mai 2023 |
| `data/images.json` | 880 bilder – bildet som merker et lydspor og vises under avspilling |
| `data/cdn.json` | Logoer |

`pins.json` er hovedkilden. 1 259 pins har lyd som finnes i Storage, 758 har bilde. 741 lydfiler i Storage er ikke knyttet til noen pin.

Brukersamlingen (`users`) er bevisst utelatt fordi den inneholder e-postadresser. `creator` i pins er bare en anonym bruker-ID.
