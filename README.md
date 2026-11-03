# SolTele — Site Vitrine Officiel (Solutions Telecom Officielle CI)

Documentation technique et guide de maintenance destiné aux développeurs travaillant sur le site vitrine bilingue (**FR / EN**) avec thème **Dark / Light** de **Solutions Telecom Officielle CI (SolTele)**, intégrateur télécom et IT basé à **Cocody, Abidjan** (Deux Plateaux Vallon, Rue des Jardins).

---

## Sommaire

1. [Démarrage rapide (Installation & Commandes)](#1-démarrage-rapide-installation--commandes)
2. [Stack technique & Particularités du projet](#2-stack-technique--particularités-du-projet)
3. [Architecture des dossiers et fichiers](#3-architecture-des-dossiers-et-fichiers)
4. [Guide pratique : Comment modifier chaque partie du site](#4-guide-pratique--comment-modifier-chaque-partie-du-site)
   - [A. Modifier le téléphone, WhatsApp, l’adresse, l’email ou les compteurs](#a-modifier-le-téléphone-whatsapp-ladresse-lemail-ou-les-compteurs)
   - [B. Modifier les textes en Français et en Anglais (i18n)](#b-modifier-les-textes-en-français-et-en-anglais-i18n)
   - [C. Ajouter, modifier ou supprimer un logo partenaire](#c-ajouter-modifier-ou-supprimer-un-logo-partenaire)
   - [D. Remplacer les photos d’illustration par de vraies photos](#d-remplacer-les-photos-dillustration-par-de-vraies-photos)
   - [E. Connecter le formulaire de contact à un backend ou une API](#e-connecter-le-formulaire-de-contact-à-un-backend-ou-une-api)
   - [F. Modifier le nom de domaine final et le référencement SEO](#f-modifier-le-nom-de-domaine-final-et-le-référencement-seo)
5. [Identité visuelle & Règles de design spécifiques à respecter](#5-identité-visuelle--règles-de-design-spécifiques-à-respecter)
6. [Pistes d’amélioration et évolutions futures](#6-pistes-damélioration-et-évolutions-futures)

---

## 1. Démarrage rapide (Installation & Commandes)

Prérequis : **Node.js 20+** et **npm 10+**.

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d’environnement (si pas déjà présent)
# Copier .env.example vers .env et renseigner VITE_GA_MEASUREMENT_ID

# 3. Lancer le serveur de développement (avec rechargement à chaud HMR)
npm run dev

# 4. Vérifier la qualité du code (Oxlint + règles React Compiler)
npm run lint

# 5. Compiler TypeScript et générer le build de production dans /dist
npm run build

# 6. Tester le build de production localement
npm run preview
```

---

## 2. Stack technique & Particularités du projet

| Technologie | Rôle et particularité dans ce projet |
| :--- | :--- |
| **React 19 + TypeScript strict** | Composants fonctionnels typés avec le **React Compiler** activé (`vite.config.ts`) pour optimiser automatiquement les rendus. |
| **Vite 8 (Rolldown)** | Bundler ultra-rapide configuré avec découpage manuel des chunks (`vendor`, `motion`, `icons`) pour garder des fichiers JS légers. |
| **Tailwind CSS 3 + Variables CSS** | Palette pilotée par des variables RGB (`--bg`, `--surface`, `--card`, `--fg`, `--muted`, `--accent`) permettant de basculer entre **Dark mode** et **Light mode** sans dupliquer toutes les classes. |
| **Framer Motion** | Gère le loader de démarrage, l’apparition du titre mot par mot, le carrousel filtrable, la timeline circuit au scroll et le menu mobile plein écran. |
| **Polices locales (`@fontsource-variable`)** | Aucune dépendance externe à Google Fonts (meilleure performance et confidentialité) : **Sora** (titres), **Inter** (corps), **JetBrains Mono** (chiffres et badges techniques). |
| **Bilingue FR / EN typé** | Le fichier `src/i18n/fr.ts` définit le type `Dictionary`. Si une clé est ajoutée en français mais oubliée dans `src/i18n/en.ts`, TypeScript signale immédiatement l’erreur. |

---

## 3. Architecture des dossiers et fichiers

```text
soltele/
├── public/
│   ├── favicon.ico / favicon.svg / apple-touch-icon.png
│   ├── logo-soltele.png       # Logo officiel PNG transparent (utilisé par le SEO / JSON-LD)
│   ├── og-image.jpg           # Image d’aperçu réseaux sociaux (1200x630, WhatsApp / LinkedIn / Facebook)
│   ├── robots.txt             # Instructions d’indexation pour Googlebot et Bingbot
│   ├── sitemap.xml            # Plan du site XML bilingue (FR/EN) + balises images
│   └── site.webmanifest       # Manifeste PWA
├── src/
│   ├── assets/
│   │   ├── images/            # Toutes les images WebP (photos 640w/1024w/1376w, logo, partenaires)
│   │   ├── images.ts          # Registre centralisé exportant `photos`, `partnerLogos`, `logoFull`, `logoFullDark`
│   │   └── patterns/          # Les 5 motifs SVG signature de la marque SolTele
│   │       ├── CircuitPagne.tsx     # Trame géométrique ouest-africaine façon circuit imprimé
│   │       ├── DataPackets.tsx      # Particules vertes animées le long des pistes
│   │       ├── DiagonalDivider.tsx  # Séparateur de section incliné (~-8°)
│   │       ├── LagoonLine.tsx       # Skyline du Plateau d’Abidjan + lagune Ébrié + antennes clignotantes
│   │       ├── SignalRings.tsx      # Anneaux concentriques de signal pulsés
│   │       └── SMark.tsx            # Monogramme "S" circulaire tranché en diagonale
│   ├── components/
│   │   ├── ui/
│   │   │   ├── BrandLoader.tsx      # Écran de chargement initial au démarrage
│   │   │   ├── Logo.tsx             # Composant Logo (bascule auto entre version claire et sombre)
│   │   │   ├── SectionHeader.tsx    # En-tête de section réutilisable (eyebrow + titre bicolore)
│   │   │   ├── SmartImage.tsx       # Image WebP avec skeleton de chargement et coupe diagonale
│   │   │   ├── ThemeToggle.tsx      # Bouton Soleil / Lune avec animation View Transition
│   │   │   └── ViewFilterBar.tsx    # Barre permettant de filtrer l’affichage par section
│   │   ├── Header.tsx         # Barre de navigation sticky + barre de lecture + menu mobile plein écran
│   │   ├── Hero.tsx           # Section d’accueil + tableau de bord réseau interactif
│   │   ├── Stats.tsx          # Bandeau des 3 compteurs animés (+10 ans, +200 clients, 24/7)
│   │   ├── About.tsx          # Section À propos (constellation réseau + 3 cartes valeurs tilt 3D)
│   │   ├── Services.tsx       # Carrousel photo filtrable + Bento Grid asymétrique des 4 métiers
│   │   ├── Process.tsx        # Timeline Méthode en 4 étapes reliée par un circuit animé au scroll
│   │   ├── Partners.tsx       # Double bandeau défilant infini des partenaires officiels
│   │   ├── Contact.tsx        # Formulaire validé + carte de visite Cocody + carte OpenStreetMap
│   │   ├── Footer.tsx         # Pied de page + skyline lagune + liens + copyright dynamique
│   │   ├── LanguageSwitch.tsx # Sélecteur FR | EN instantané
│   │   └── WhatsAppButton.tsx # Bouton flottant WhatsApp (prioritaire en Côte d’Ivoire)
│   ├── config/
│   │   └── site.ts            # FICHIER CLÉ : coordonnées, téléphone, WhatsApp, stats, partenaires
│   ├── hooks/                 # Hooks personnalisés (scroll, intersection, spotlight, media query)
│   ├── i18n/                  # Dictionnaires de traduction (fr.ts, en.ts) et contexte de langue
│   ├── theme/                 # Contexte Light / Dark (persistance localStorage + détection OS)
│   ├── App.tsx                # Assemblage de la page et synchronisation des URLs (?view= & ?lang=)
│   ├── index.css              # Variables de couleurs Light/Dark et classes utilitaires (.cut-tr, .glass)
│   └── main.tsx               # Point d’entrée React
├── ai.md                      # Instructions de continuité pour les assistants IA
├── tailwind.config.ts         # Configuration Tailwind (couleurs, rayons 2px-5px, animations)
└── vite.config.ts             # Configuration Vite et découpage des bundles
```

---

## 4. Guide pratique : Comment modifier chaque partie du site

### A. Modifier le téléphone, WhatsApp, l’adresse, l’email ou les compteurs
Ouvrir **[`src/config/site.ts`](./src/config/site.ts)** :
- **Téléphone & WhatsApp** : modifier `siteConfig.contact.phoneDisplay`, `phoneHref` et `whatsapp` (format international sans `+`, ex. `'2250585849752'`).
- **Adresse & Carte** : modifier `siteConfig.contact.address` et les coordonnées GPS `siteConfig.contact.geo` (`lat`, `lng`) pour ajuster automatiquement le marqueur OpenStreetMap.
- **Chiffres clés du Hero** : modifier le tableau `siteConfig.stats` (ex. passer `value: 10` à `15` ou `value: 200` à `350`).

### B. Modifier les textes en Français et en Anglais (i18n)
Aucun texte n’est écrit en dur dans les composants React.
1. Ouvrir **[`src/i18n/fr.ts`](./src/i18n/fr.ts)** et modifier le texte souhaité.
2. Ouvrir **[`src/i18n/en.ts`](./src/i18n/en.ts)** et appliquer l’équivalent en anglais.
3. **Important** : si tu ajoutes une nouvelle clé dans `fr.ts`, ajoute exactement la même clé dans `en.ts` (TypeScript vérifie que les deux fichiers ont la même structure).

### C. Ajouter, modifier ou supprimer un logo partenaire
1. Placer le nouveau logo au format `.webp` (de préférence sur fond transparent) dans `src/assets/images/partner-<nom>.webp`.
2. Dans **[`src/assets/images.ts`](./src/assets/images.ts)** :
   - Ajouter `'<nom>'` au type `PartnerLogoKey`.
   - Ajouter `<nom>: files['./images/partner-<nom>.webp'] ?? ''` dans l’objet `partnerLogos`.
3. Dans **[`src/config/site.ts`](./src/config/site.ts)** :
   - Ajouter l’entrée dans le tableau `siteConfig.partners` avec son `id`, `name`, `logoKey`, `specialtyFr` et `specialtyEn`.

### D. Remplacer les photos d’illustration par de vraies photos
Les photos du carrousel et des cartes d’expertise se trouvent dans `src/assets/images/`.
Chaque visuel est décliné en 3 largeurs pour optimiser la vitesse sur mobile, tablette et ordinateur :
- `<cle>-640.webp` (mobile)
- `<cle>-1024.webp` (tablette / petit écran)
- `<cle>-1376.webp` (grand écran)

Les 7 clés actuelles (définies dans `src/assets/images.ts`) sont :
- `voip` : Téléphonie IP & postes de bureau
- `cyber` : Salle serveurs & cybersécurité
- `cctv` : Caméra de vidéosurveillance
- `network` : Baie de brassage & câblage réseau
- `technician` : Technicien en intervention
- `team` : Équipe en réunion à Abidjan
- `abidjan` : Vue panoramique du Plateau et de la lagune Ébrié

Il suffit de remplacer ces fichiers en conservant les mêmes noms pour que tout le site (Hero, À propos, Carrousel, Bento Grid) se mette à jour automatiquement.

### E. Connecter le formulaire de contact à un backend ou une API
Par défaut, le formulaire prépare un email complet via `mailto:` (et propose un bouton direct vers WhatsApp).
Pour envoyer les messages vers un serveur ou un service tiers (Formspree, Resend, API Node/PHP, etc.) :
1. Ouvrir **[`src/config/site.ts`](./src/config/site.ts)**.
2. Modifier le bloc `form` :
   ```ts
   form: {
     mode: 'endpoint',
     endpoint: 'https://votre-domaine.ci/api/contact',
   },
   ```
3. Le composant **[`src/components/Contact.tsx`](./src/components/Contact.tsx)** enverra alors une requête `POST` JSON contenant `{ name, company, email, phone, message }` et gèrera automatiquement l’état de chargement, le message de confirmation et les erreurs.

### F. Modifier le nom de domaine final et le référencement SEO
Le domaine configuré par défaut est `https://www.soltele.ci`. Si le domaine définitif change, effectuer un rechercher/remplacer de `https://www.soltele.ci` dans ces 4 fichiers :
1. [`src/config/site.ts`](./src/config/site.ts) (`siteConfig.brand.url`)
2. [`index.html`](./index.html) (balises `canonical`, `og:url`, `og:image`, `hreflang` et bloc `application/ld+json`)
3. [`public/robots.txt`](./public/robots.txt) (`Sitemap:` et `Host:`)
4. [`public/sitemap.xml`](./public/sitemap.xml) (balises `<loc>` et `xhtml:link`)

---

## 5. Identité visuelle & Règles de design spécifiques à respecter

Pour que le site garde sa signature unique lors des futures mises à jour :

1. **Rayons de bordure serrés (`2px` à `5px`)** :
   - Ne pas introduire de cartes très arrondies. La configuration [`tailwind.config.ts`](./tailwind.config.ts) définit `rounded-xs` (`2px`), `rounded` (`4px`) et `rounded-md` / `rounded-lg` (`5px`).
2. **Coupes diagonales inspirées du "S" du logo** :
   - Utiliser les classes CSS `.cut-tr` (coin supérieur droit coupé), `.cut-bl` (coin inférieur gauche coupé) ou `.cut-both` sur les boutons d’action et cadres principaux.
   - Conserver `<DiagonalDivider />` entre chaque section.
3. **Effet Spotlight au survol des cartes** :
   - Les cartes utilisent la classe `.spotlight` combinée au hook `useSpotlight()` (`src/hooks/useSpotlight.ts`) qui met à jour les variables CSS `--mx` et `--my` pour faire suivre une lueur verte radiale sous le curseur.
4. **Règle typographique** :
   - Éviter les tirets (`-`, `–`, `—`) dans les textes affichés à l’écran ; privilégier les deux-points (`:`), la virgule ou le point médian (`·`).

---

## 6. Pistes d’amélioration et évolutions futures

Voici les évolutions recommandées pour faire grandir le site dans une **Phase 2** :

1. **Section Études de cas / Réalisations clients à Abidjan** :
   - Ajouter un composant `src/components/CaseStudies.tsx` présentant 3 ou 4 projets réels (ex. déploiement IPBX multi-sites, sécurisation réseau d’une PME à Cocody, vidéosurveillance d’un entrepôt en Zone Industrielle) avec filtres par secteur (Banque, Logistique, Hôtellerie, PME).
2. **Simulateur de devis interactif en 3 clics** :
   - Avant le formulaire de contact, permettre au visiteur de sélectionner son besoin (ex. *Nombre de postes téléphoniques IP*, *Nombre de caméras*, *Nombre de prises réseau*) pour pré-remplir automatiquement le message de demande de devis et le message WhatsApp.
3. **Pages dédiées par métier (Multi-pages / React Router ou pré-rendu SSG)** :
   - Transformer chaque carte du Bento Grid (*Téléphonie IP*, *Cybersécurité*, *Vidéosurveillance*, *Réseaux IT*) en une page détaillée dédiée (`/expertise/telephonie-ip`, `/expertise/cybersecurite`, etc.) afin de décupler le positionnement SEO sur des requêtes techniques précises en Côte d’Ivoire.
4. **Catalogue PDF téléchargeable (Brochure SolTele)** :
   - Ajouter un bouton dans la section *À propos* ou *Footer* permettant de télécharger la plaquette commerciale PDF de SolTele (FR / EN).
5. **Analytics & Suivi des conversions (Google Analytics 4 & Search Console)** :
   - La balise Google Analytics (`gtag.js`) est intégrée dans `index.html` et pilotée par la variable `VITE_GA_MEASUREMENT_ID` définie dans `.env`. Connecter également le domaine dans **Google Search Console** et soumettre `https://www.soltele.ci/sitemap.xml`.

