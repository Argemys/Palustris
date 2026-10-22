# Fiche Zone Humide — appli de saisie terrain

## Ce que fait l'appli

- Reprend l'intégralité des champs de tes deux fiches (recto/verso) : identification,
  délimitation, pédologie, submersion, alimentation hydrique, fonctions/atteintes,
  usages, cortège floristique (♂ non humide + 5 groupes hygrophiles), Corine
  Biotope, habitats SAGE, préconisations.
- Fonctionne **hors connexion** : les données restent stockées sur la tablette
  (mémoire du navigateur), rien n'est envoyé sur internet.
- Géolocalisation GPS automatique (bouton "Localiser").
- Chaque fiche est enregistrée individuellement ; tu peux en créer plusieurs à la
  suite pendant une sortie terrain, les rouvrir, les modifier, les supprimer.
- Export **GeoJSON** (un point par fiche, tous les champs en attributs — s'ouvre
  directement dans QGIS par glisser-déposer) et export **CSV** (import QGIS via
  "Ajouter une couche de texte délimité", ou Excel).

## Sauvegarde et restauration

Les fiches et les photos ne sont stockées que sur l'appareil. Le bouton 📋 de l'en-tête porte un
point rouge tant que des fiches n'ont pas été sauvegardées, et un rappel s'affiche au plus une fois
par jour. **Sauvegarder (ZIP)** (ou « Export complet ») télécharge un ZIP contenant `fiches.csv`,
les photos et `sauvegarde_palustris.json`. **Restaurer une sauvegarde (ZIP)** remet ces fiches et
leurs photos dans l'appli (sur le même appareil ou un nouveau) : les fiches absentes sont ajoutées,
celles plus récentes dans la sauvegarde sont mises à jour, rien n'est supprimé. Seuls les ZIP
produits à partir de la version 15 sont restaurables.

## Espèces typiques des habitats CORINE

Sous chaque habitat CORINE ajouté, la rubrique « 🌿 Espèces typiques » propose les espèces
citées pour ce code dans les descriptions officielles CORINE Biotopes (version française 1997),
puis celles citées dans ses sous-codes (les plus fréquentes d'abord). Un toucher ajoute l'espèce
au cortège floristique. Les noms anciens ont été ramenés au catalogue Alsace-Lorraine (TAXREF) ;
les espèces absentes de ce catalogue ne sont pas proposées. Fichier : `corine_especes.json`.

## Installer sur la tablette Android

Pour un vrai fonctionnement hors ligne réinstallable (icône sur l'écran d'accueil,
utilisable même après redémarrage sans réseau), le dossier doit être **hébergé en
HTTPS** — c'est une contrainte technique des navigateurs, pas de l'appli elle-même.
Deux options simples et gratuites :

1. **GitHub Pages** (recommandé, gratuit) : crée un dépôt GitHub, dépose les 4
   fichiers (`index.html`, `manifest.json`, `sw.js`, `icon.svg`), active GitHub
   Pages dans les paramètres du dépôt. Tu obtiens une URL type
   `https://tonpseudo.github.io/zh-app/`.
2. Toute autre solution d'hébergement statique HTTPS (Netlify, serveur de ta
   structure, etc.) fonctionne aussi.

Une fois l'URL ouverte dans Chrome sur la tablette : menu ⋮ → **"Installer
l'application"** (ou "Ajouter à l'écran d'accueil"). L'icône verte apparaît, et
l'appli s'ouvre ensuite en plein écran, sans barre d'adresse, même sans réseau.

*Sans hébergement HTTPS*, tu peux quand même l'utiliser en ouvrant `index.html`
directement dans Chrome depuis les fichiers de la tablette — la saisie et le
stockage local fonctionnent, mais l'installation en icône et le cache hors-ligne
avancé (service worker) ne s'activeront pas.

## Installer sur iPad / iOS

C'est la même appli (mêmes fichiers) — seule la manière de l'installer change,
Safari a ses propres règles :

1. Héberge les fichiers en HTTPS (voir option GitHub Pages ci-dessus — Android
   et iOS peuvent utiliser exactement la même URL).
2. Ouvre l'URL dans **Safari** (pas Chrome : sur iOS, seul Safari peut installer
   une PWA sur l'écran d'accueil).
3. Bouton **Partager** (le carré avec la flèche) → **"Sur l'écran d'accueil"**.
4. L'icône verte apparaît ; l'appli s'ouvre en plein écran, sans barre Safari.

**Particularités iOS à connaître :**
- Le stockage hors-ligne des données fonctionne, mais iOS peut occasionnellement
  vider les données d'un site resté inutilisé plusieurs semaines si l'appli n'a
  pas été ouverte depuis l'écran d'accueil (rare, mais autant exporter en
  GeoJSON/CSV régulièrement pendant une campagne terrain, par sécurité — c'est
  de toute façon une bonne habitude quelle que soit la plateforme).
- Si tu supprimes l'icône de l'écran d'accueil, les données stockées dans
  l'appli sont supprimées avec elle. Exporte avant de désinstaller.

## Simplifications faites par rapport au papier

Pour rester utilisable sur écran tactile, quelques éléments ont été adaptés :

- La grille manuscrite jour/mois/année → un simple sélecteur de date.
- Les grilles de saisie chiffre par chiffre (coordonnées GPS, codes Corine
  Biotope) → champs texte classiques ; les coordonnées se remplissent
  automatiquement via le GPS de la tablette.
- "Précipitations \| Autre" et "Source \| Evaporation" → séparés en lignes
  distinctes (Précipitations / Autre, Source / Évaporation) pour plus de clarté.
- Les échelles -, +/-, + sont des boutons à toucher (au lieu de cases à cocher).

## Étapes suivantes possibles

- Ajouter la prise de photo terrain (rattachée à chaque fiche).
- Ajouter un fond de carte pour visualiser les fiches déjà saisies sur le terrain.
- Générer un identifiant de fiche automatique lié à ta nomenclature interne.
- Champ "Planches AT" en liste déroulante si tu as une nomenclature fixe.

Dis-moi ce qui manque ou ce qui te semble mal calé une fois testé sur le terrain —
c'est plus facile à ajuster une fois que tu l'as manipulé.
