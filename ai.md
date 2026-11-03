# Guide d’évolution IA · SolTele (Solutions Telecom Officielle CI)

Ce document est destiné à tout modèle IA (ou développeur) amené à faire évoluer le site vitrine bilingue (**FR / EN**) de **Solutions Telecom Officielle CI** (marque courte : **SolTele**), intégrateur télécom et IT basé à **Cocody, Abidjan** (Deux Plateaux Vallon, Rue des Jardins).

Avant toute modification, lis attentivement ces règles : elles garantissent la cohérence artistique, technique et éditoriale du projet.

---

## 1. Directives artistiques immuables (issues du logo SolTele)

Le design entier découle du logo officiel (`reference/logo-soltel.png` et `src/assets/images/logo-mark.webp`) :

1. **Le "S" circulaire coupé en diagonale (~-8°)** :
   - Aucune séparation de section horizontale plate : utiliser systématiquement `<DiagonalDivider />` (`src/assets/patterns/DiagonalDivider.tsx`).
   - Utiliser les classes CSS `.cut-tr`, `.cut-bl` ou `.cut-both` (`src/index.css`) pour les coins biseautés des boutons principaux, cadres photos et cartes phares.
   - Le monogramme vectoriel `<SMark />` (`src/assets/patterns/SMark.tsx`) sert en filigrane géant (opacité `4%` à `6%`) dans le Hero, le menu mobile et le Footer, ainsi que dans les états de chargement.

2. **Le double vert sombre / vert lumineux** :
   - **Vert profond (`#063d2d` / `#041b12`)** : structure l’interface, les sections sombres et les cartes d’ancrage.
   - **Vert néon (`#39d94a` / `#22c55e`)** : réservé aux actions importantes (CTA, indicateurs actifs, nœuds de signal, lueurs maitrisées).
   - **Dégradé de marque** : `from-[#063d2d] via-[#0b5a44] to-[#39d94a]` pour les surfaces et `from-green-600 via-[#22c55e] to-[#39d94a]` (`.text-gradient`) pour les mots clés des titres (reproduisant le contraste `"OL"` sombre + `"TELE"` dégradé du logo).

3. **Les 5 motifs signature (`src/assets/patterns/`)** :
   - `SMark.tsx` : Monogramme S circulaire tranché en diagonale.
   - `SignalRings.tsx` : Anneaux concentriques à pulsation lente (`animate-pulse-ring`).
   - `CircuitPagne.tsx` : Trame géométrique ouest africaine (losanges, zigzags, pistes à 45° et nœuds lumineux) en SVG inline répétable.
   - `LagoonLine.tsx` : Silhouette stylisée du Plateau d’Abidjan et ondes de la lagune Ébrié avec points lumineux clignotants comme des antennes (en bas du Hero et du Footer).
   - `DataPackets.tsx` : Particules vertes circulant le long des pistes (`animate-flow`), automatiquement désactivées si `prefers-reduced-motion: reduce` est actif.

4. **Rayons de bordure stricts (2 px à 5 px)** :
   - Ne jamais utiliser de grands arrondis génériques (`16px`, `24px`, `32px`) sur les cartes ou boutons.
   - `tailwind.config.ts` verrouille les échelles : `rounded-xs` / `rounded-sm` = `2px`, `rounded` = `4px`, `rounded-md` / `rounded-lg` / `rounded-xl` = `5px`.
   - `rounded-full` est réservé uniquement aux cercles purs (points de statut, anneaux de signal, bouton flottant WhatsApp, médaillon du logo).

5. **Règle éditoriale stricte : aucun tiret dans les textes visibles** :
   - Ne jamais écrire de tiret (`-`, `–`, `—`) dans les chaines de caractères affichées à l’écran (`src/i18n/fr.ts` et `src/i18n/en.ts`).
   - Privilégier les deux points (`:`), la virgule, le point médian (`·`) ou reformuler naturellement (ex. écrire `au delà`, `ci dessous`, `Firewalls`, `solutions contre les intrusions`, `+225 05 85 84 97 52`).

---

## 2. Système de thème Light / Dark (`src/theme/`)

Le site fonctionne en **Dark mode** (par défaut, inspiré de Linear / Vercel) et en **Light mode** (lumineux, jamais de blanc pur en fond de page) :

| Token CSS (`src/index.css`) | Classe Tailwind | Light Mode | Dark Mode |
| :--- | :--- | :--- | :--- |
| `--bg` | `bg-bg` | `#F7FAF8` | `#041B12` |
| `--surface` | `bg-surface` | `#FFFFFF` | `#07281B` |
| `--card` | `bg-card` | `#F9FCFA` | `#0B3321` |
| `--fg` | `text-fg` | `#0A0A0A` | `#FFFFFF` |
| `--muted` | `text-muted` | `#374151` | `#D1D5DB` |
| `--accent` | `text-accent` / `bg-accent` | `#22C55E` | `#39D94A` |

- **Alternance rythmée** : Même en mode clair, certaines sections structurantes (`Hero`, bandeau `Sur le terrain`, `Méthode`, `Partenaires`, `Footer`) conservent leur atmosphère forêt profonde (`#041b12` / `#063d2d`) pour préserver le rythme visuel.
- **Transition** : `ThemeContext.tsx` utilise l’API native `document.startViewTransition` pour révéler le nouveau thème en cercle depuis le bouton Soleil/Lune (`ThemeToggle.tsx`), avec fallback fluide `.theme-fade`.

---

## 3. Architecture des fichiers

```text
src/
├── assets/
│   ├── images/                # Photos WebP responsives (640w, 1024w, 1376w) + logo-mark.webp
│   ├── images.ts              # Registre typé des images (src, srcSet, dimensions)
│   └── patterns/              # Les 5 motifs signature SVG
│       ├── CircuitPagne.tsx
│       ├── DataPackets.tsx
│       ├── DiagonalDivider.tsx
│       ├── LagoonLine.tsx
│       ├── SignalRings.tsx
│       ├── SMark.tsx
│       └── index.ts
├── components/
│   ├── ui/
│   │   ├── BrandLoader.tsx    # Écran de chargement initial signé (S + anneaux + progression)
│   │   ├── Logo.tsx           # Lockup officiel SolTele (S 3D + Sol + Tele en dégradé)
│   │   ├── SectionHeader.tsx  # En-tête de section standardisé avec mot clé en dégradé
│   │   ├── SmartImage.tsx     # Image WebP progressive avec skeleton shimmer + coupe diagonale
│   │   ├── ThemeToggle.tsx    # Bouton Soleil ↔ Lune animé
│   │   └── ViewFilterBar.tsx  # Barre de filtrage rapide des vues avec transition de chargement
│   ├── About.tsx              # Section À propos (constellation réseau + 3 cartes tilt 3D)
│   ├── Contact.tsx            # Formulaire validé + bloc infos Cocody + carte OpenStreetMap
│   ├── Footer.tsx             # Pied de page forêt + LagoonLine + liens + année dynamique
│   ├── Header.tsx             # Header sticky + barre de progression + menu mobile plein écran
│   ├── Hero.tsx               # Hero forêt + titre mot par mot + dashboard glassmorphism + Stats
│   ├── LanguageSwitch.tsx     # Sélecteur FR | EN avec icône Globe et pilule glissante
│   ├── Partners.tsx           # Double marquee infini sens opposés (slots SVG à remplacer)
│   ├── Process.tsx            # Timeline 4 étapes reliée par une piste circuit animée au scroll
│   ├── Services.tsx           # Carrousel filtrable Motion + Bento Grid asymétrique 4 métiers
│   ├── Stats.tsx              # 3 compteurs animés au scroll (JetBrains Mono)
│   └── WhatsAppButton.tsx     # Bouton flottant WhatsApp avec anneaux de signal
├── config/
│   └── site.ts                # Configuration centralisée (téléphone, adresse, stats, mode formulaire, partenaires)
├── hooks/
│   ├── useActiveSection.ts    # Scroll spy pour la navigation
│   ├── useInView.ts           # Wrapper IntersectionObserver
│   ├── useMediaQuery.ts       # Hook media query réactif
│   ├── useScrollProgress.ts   # Progression de lecture (0 à 1) et état compact du header
│   └── useSpotlight.ts        # Halo radial qui suit le curseur (--mx, --my)
├── i18n/
│   ├── fr.ts                  # Dictionnaire français de référence (définit le type Dictionary)
│   ├── en.ts                  # Dictionnaire anglais typé strictement sur Dictionary
│   ├── LanguageContext.tsx    # Provider de langue (détection URL/localStorage/navigateur + sync SEO)
│   └── useTranslation.ts      # Hook useTranslation() et contexte
├── lib/
│   └── useSafeId.ts           # Générateur d’ID SVG compatible SSR/React 19
├── theme/
│   ├── ThemeContext.tsx       # Provider Light/Dark + View Transitions API
│   └── useTheme.ts            # Hook useTheme() et contexte
├── App.tsx                    # Assemblage principal, filtre de vue et accessibilité
├── index.css                  # Tokens CSS, utilitaires (.cut-tr, .spotlight, .glass)
└── main.tsx                   # Point d’entrée et chargement des polices variables
```

---

## 4. Recettes pour faire évoluer le projet

### A. Modifier les chiffres clés, coordonnées ou partenaires
Toutes les valeurs métier et les emplacements temporaires (`PLACEHOLDER`) sont centralisés dans **`src/config/site.ts`** :
- `siteConfig.contact` : numéro de téléphone, numéro WhatsApp, adresse à Cocody, email et coordonnées GPS.
- `siteConfig.stats` : valeurs des compteurs du Hero (`+10`, `+200`, `24/7`).
- `siteConfig.partners` : remplacer les entrées `{ id: 'partner-1' }` par `{ id: 'cisco', name: 'Nom Officiel', logo: '/logos/partenaire.svg' }` une fois les accords validés, puis afficher `item.logo` dans `src/components/Partners.tsx`.

### B. Connecter le formulaire de contact à un backend
Dans **`src/config/site.ts`** :
```ts
form: {
  mode: 'endpoint', // au lieu de 'mailto'
  endpoint: 'https://votre-api.ci/contact',
}
```
`src/components/Contact.tsx` enverra alors automatiquement une requête `POST` JSON `{ name, company, email, phone, message }` avec gestion des états `submitting`, `success` et `error`.

### C. Ajouter ou modifier du texte (i18n strict)
1. Aucun texte visible ne doit être écrit en dur dans un composant TSX.
2. Ajouter d’abord la clé dans **`src/i18n/fr.ts`**.
3. Ajouter immédiatement la même clé dans **`src/i18n/en.ts`** (TypeScript bloquera la compilation si une clé manque ou diffère).
4. Vérifier qu’aucun tiret (`-`, `–`, `—`) n’est présent dans les textes.

### D. Ajouter une nouvelle photo WebP
1. Générer 3 déclinaisons WebP dans `src/assets/images/` : `<nom>-640.webp`, `<nom>-1024.webp`, `<nom>-1376.webp`.
2. Ajouter la clé dans le type `PhotoKey` et l’objet `photos` de **`src/assets/images.ts`**.
3. Toujours afficher l’image via `<SmartImage />` (`src/components/ui/SmartImage.tsx`) pour bénéficier du chargement progressif avec skeleton signé et coupe diagonale.

---

## 5. Checklist de validation obligatoire après chaque modification

Avant de livrer toute évolution, exécuter systématiquement :

```bash
npm run lint   # Doit retourner : Found 0 warnings and 0 errors (Oxlint + React Compiler rules)
npm run build  # Doit compiler TypeScript (tsc -b) et produire le bundle Vite sans erreur
```

