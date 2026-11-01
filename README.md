# SoundPin

En tjeneste som leser opp historier om nærmiljøet mens du beveger deg ute.

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
