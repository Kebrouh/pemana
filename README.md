# Pemana Inc.

Site web de Pemana Inc. : logements à louer à Saint-Jérôme et au Lac-Supérieur, quais saisonniers à la marina de Pointe-Fortune, projets à venir.
Vue 3 + Vite, mis en ligne par GitHub Pages à chaque envoi sur la branche `main`.

## Démarrer

```sh
npm install
npm run dev        # serveur local
npm run build      # construit le site dans dist/
npm run lint       # vérifie le code (corrige ce qui peut l'être)
```

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Un logement (prix, description, chambres, photos) | `src/assets/json/location.json` |
| Les cartes de l'accueil | `src/assets/json/categories.json` |
| Téléphones, courriel, adresse, Facebook | `src/data/contact.js` |
| Couleurs, espacements, arrondis | `src/assets/scss/base/_variables.scss` |
| Boutons, cartes, étiquettes partagés | `src/assets/scss/base/_composants.scss` |
| Une page | `src/views/` (la page) et `src/components/AffichageData/` (son contenu) |
| Le style d'une page | `src/assets/scss/components/pages/` |

Les couleurs : le vert forêt porte les boutons et le pied de page, le vert lime est l'accent. Le bleu est réservé à la page Marina,
qui redéfinit les variables vertes en bleu dans `_page-marina.scss`.

## Ajouter ou changer des photos de logement

1. Dépose les photos dans `public/` (garde les originaux ailleurs).
2. Ajoute leur nom de fichier dans la liste `images` du logement, dans `location.json` (la première est celle de la carte).
3. Lance `npm run photos` : les photos trop lourdes sont réduites à 2000 px et les miniatures de 640 px sont créées dans `public/min/`.
4. Vérifie avec `npm run dev`, puis envoie sur `main`.

Si la commande signale une photo introuvable, le nom dans `location.json` ne correspond pas au fichier de `public/`.

## Mise en ligne

Un envoi sur `main` lance le déploiement GitHub Pages (`.github/workflows/vue.yml`). Il dure environ deux minutes.

## Formulaire d'appel de service

Le formulaire envoie un courriel avec EmailJS (identifiants dans `src/components/AffichageData/AffichageService.vue`).
La clé publique y est visible, c'est normal pour EmailJS ; le quota d'envois se règle dans le compte EmailJS.
