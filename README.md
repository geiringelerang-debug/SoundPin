# SoundPin

En tjeneste som leser opp historier om nærmiljøet mens du beveger deg ute.

## Data

Lydfilene og bildene ligger i Firebase Storage (`soundpin-50207.appspot.com`). Repoet inneholder bare oversikter med offentlige lenker:

| Fil | Innhold |
|---|---|
| `data/audio.json` | 1 971 lydspor (.m4a, ca. 196 MB), innspilt mars 2022 – mai 2023 |
| `data/images.json` | 880 bilder – ett bilde merker hvert lydspor og vises under avspilling |
| `data/cdn.json` | Logoer |

Metadata (posisjon, tittel, kategori, kobling lyd ↔ bilde) ligger i Firestore og kommer i neste omgang.
