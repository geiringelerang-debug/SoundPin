# SoundPin

En tjeneste som leser opp historier om nærmiljøet mens du beveger deg ute.

## Versjon 5 (november 2026)

- **Nedtelling ved opptak:** tidtakeren viser tiden som er igjen. De siste 10 sekundene blir den rød, og telefonen vibrerer.
- **Arkiver fra kartet (admin):** «🗄 Arkiver» i spilleren skjuler sporet for alle, med «Angre». Arkiverte nye spor kan gjenopprettes i profilen → Administrasjon. Arkivspor fra den gamle appen finnes under «Rydd arkivet» → Arkivert.
- **Introduksjon** ved oppstart med «Hopp over», og **bruksområder** under «?» øverst. «Prøv» åpner skjemaet med valgene ferdig satt.
- **Kodeord:** et spor kan kreve riktig svar (flere svar skilles med /). Svaret lagres som SHA-256. Neste skjulte spor i sekvensen dukker opp når svaret er riktig.
- **Tidtaking:** en ny sekvens kan få tidtaking og tidsfrist. Klokka går fra man forlater første spor til man er innom siste, i rekkefølge og innenfor satt radius. Resultater lagres i `sp_results`.
- **📣 Utfordre:** deler sporet med en ferdig utfordringstekst.
- Ny kategori «seiling». Svar på spor med kategorien «minner» vises som «Minner fra dette stedet».

**Lim inn den nye `firestore.rules` og publiser** (ny samling `sp_results`, og admin kan arkivere nye spor).

## Versjon 4 (november 2026)

- **Følg og demp innspillere.** Når et spor spilles: «☆ Følg» eller «🔕 Demp». Det gjelder alle spor fra innspilleren, ikke bare dette sporet. Spor fra dem du følger får en gul ring i kartet. I gå- og bilmodus går de foran andre spor, regnes ikke med i grensen på 15 spor og spilles hver gang du passerer. Spor fra dem du har dempet, skjules og spilles ikke av. Valgene lagres på kontoen (`follows`, `mutes` i `sp_users`) og kan angres i profilen. Arkivspor fra eiere som ikke har sagt ja til at navnet vises, regnes som én innspiller: «SoundPin-arkivet».
- **Filter på innspiller** under kategoriene (vises når det finnes mer enn én).
- **Jevn lydstyrke.** Hvert spor har en målt lydstyrke (`loud`, ca. LUFS), og appen justerer nivået mot −16 LUFS når sporet spilles, med en begrenser mot skurring. Lydfilene endres ikke. Nye opptak måles når de lagres. Gamle spor måles med profil → Administrasjon → 🔊 *Mål lydstyrke*.
  - **Krever CORS på Storage-bøtta.** Uten det kan svake spor ikke forsterkes, og målingen virker ikke. Sterke spor dempes likevel, men ikke på iPhone. Kjør én gang i Google Cloud Console → Cloud Shell:
    ```
    echo '[{"origin":["https://geiringelerang-debug.github.io"],"method":["GET","HEAD"],"maxAgeSeconds":3600}]' > cors.json
    gsutil cors set cors.json gs://soundpin-50207.appspot.com
    ```
- **Tapte spor** (profil → Administrasjon → 🧩): de 741 lydfilene som mistet sporet sitt i den gamle appen, ett om gangen. `data/lost.json` kobler 144 av dem til et bilde ut fra bruker og tidspunkt, og bildenavnet blir tittel. 197 har en foreslått posisjon fra et spor samme person tok opp innen en time, og 271 til fra samme døgn (merket «sjekk nøye»). Resten plasseres ved adressesøk, «↺ Forrige» eller et trykk i kartet. Hurtigtaster B/U/A, ←/→ og mellomrom. Sporet blir et vanlig arkivspor når det er plassert og beholdt.

**Lim inn den nye `firestore.rules` og publiser** (verifikatorer kan nå lagre målt lydstyrke på nye spor).

## Versjon 3 (november 2026)

- **Radius per spor (10–500 m).** Settes under «Avansert» når sporet lages; over 200 m krever autorisert status. Brukeren kan skalere alle radiuser (Nær / Normal / Vid) i profilen. Åpne spor starter fortsatt ca. 20 s før du er fremme i fart. Et spor som er spilt, utløses ikke igjen før du har vært et stykke utenfor radiusen (hysterese). Gå-modus viser GPS-nøyaktigheten (±m).
- **Hvordan finnes sporet?** *Vises i kartet* (som før), *Må være der* (vises med 🔒; låses opp når du er innenfor radiusen én gang, og kan deretter høres hvor som helst) eller *Skjult skattejakt* (vises ikke før du er der). Opplåsinger lagres på kontoen, gir poeng i lyttescoren, og svar på et opplåst spor får merket «📍 var her». Filteret «🔓 Opplåst» viser sporene du har låst opp.
- **Godkjenning:** vanlige brukere kan velge «Alle». Sporet deles da med venner og havner i godkjenningskøen (profil → Administrasjon). Admin kan også trekke tilbake offentlige spor.
- **Rydding i arkivet** (profil → Administrasjon → 🧹): ett spor om gangen med Behold (B), Usikker (U), Arkiver (A), ←/→ og mellomrom. Tittel, kategori, eier, radius, «hvordan finnes» og verifisering kan endres. Arkiverte spor skjules, men slettes ikke. «👥 Eiere» setter navn, om navnet skal vises, og e-post som kobler arkivsporene til en ny konto ved innlogging.
- **Administratorer:** e-postene i `ADMIN_EMAILS` (firebase-config.js og firestore.rules) med bekreftet e-post, eller rollen *Administrator* gitt i profilen.
- **Innlogging:** egen visning for «Ny konto», «Glemt passord», og forsøk på å opprette en konto som finnes logger inn i stedet.
- **Bilmodus:** bildet til sporet vises som stillbilde; beskrivelse og forstørring bare når bilen står stille; dempet bilde om kvelden.
- **Skjema for nytt spor:** standardvalg alltid synlig (opptak/tekst, bilde, tittel, hvem kan høre, kategori); resten under «Avansert» med sammendrag.

Nye samlinger i Firestore: `sp_archive` (rydding), `sp_legacy_owners` (eiere av arkivspor), `sp_owner_claims` (e-post → eier, privat) og `sp_users/<uid>/unlocks`. **Lim inn den nye `firestore.rules` og publiser.**

## Versjon 2

Web-appen (`index.html`) kjører på GitHub Pages og bruker Firebase til innlogging, lagring og lyttescore.

- **Lytte:** kart med spor, kategorifilter, varmekart (🔥), gå-modus som spiller spor som ligger foran deg, og bilmodus som slår seg på automatisk over ca. 25 km/t.
- **Lyttescore:** andelen som hører et spor ferdig, der lyttinger mister halve vekten etter 30 dager. Nye spor får ekstra synlighet i 14 dager, og et svar gir sporet ny synlighet i 7 dager. Høy score gir større og tydeligere markør.
- **Lage spor:** hold krysset midt i kartet inne for å ta opp der krysset står (trykk for tekst og flere valg). Opptak (maks 90 s, 5 min for autoriserte) eller tekst som leses opp med telefonens stemme, med bilde, kategorier og plassering.
- **Deling:** bare meg, venner (de som har åpnet invitasjonslenken din) eller alle. Nye brukere kan dele med venner; deling med alle krever autorisert status.
- **Skjulte spor:** vises ikke i kartet, men dukker opp når du er innen 40 m, eller når du har hørt forrige spor i samme sekvens.
- **Sekvenser:** spor med sekvensnummer. Retningen beregnes fra rekkefølgen, og sporene spilles bare når du beveger deg samme vei.
- **Svar, egne ikoner, rapportering, verifisering og roller.** Administrator (`ADMIN_EMAIL`) gir roller i profilen.

Begrensning: i en nettleser stopper posisjon og avspilling når skjermen slås av. Det krever et app-skall (senere versjon).

### Oppsett i Firebase

1. Lim konfigurasjonen fra web-appen inn i `firebase-config.js`.
2. **Authentication → Sign-in method:** slå på *Anonymous*, *Google* og *Email/Password*.
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
