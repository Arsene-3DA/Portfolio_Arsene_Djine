# Portfolio d’Arsène Dissi Djine

Site statique. Le texte, les couleurs, les polices et les espacements reprennent la page publiée sur `main` (commit `7710bdd`). Le même contenu est réparti en vues.

## Lancer en local

```bash
python3 -m http.server 8765
```

Ouvrir [http://127.0.0.1:8765/](http://127.0.0.1:8765/).

## Où modifier les textes

Tout le texte est dans [`js/data.js`](js/data.js) : identité, études de cas, projets GitHub, parcours, compétences, formation.

Le dessin des six outils est [`assets/reseau-outils.svg`](assets/reseau-outils.svg).

## Structure

```
index.html          en-tête, pied de page, zone des vues
css/styles.css      style de la version d’origine
js/data.js          textes
js/app.js           changement de vue
js/router.js        adresses #/cas, #/projets, #/outils, #/parcours, #/contact
js/views/           une vue par section
js/sculpture.js     sculpture Three.js de l’accueil
js/tools.js         réseau d’outils
```

Les anciennes ancres `#cas`, `#projets`, `#outils`, `#parcours` et `#contact` ouvrent la vue correspondante.

La sculpture se charge quand l’accueil est visible. Elle suit le pointeur, sans boucle d’animation. Le réseau d’outils se met en pause hors écran, avec le bouton « Mettre l’animation en pause », et les deux s’arrêtent si `prefers-reduced-motion: reduce`.

## Déployer sur Vercel

Le dépôt est relié au projet Vercel `portfolio-arsene-djine`. La production suit `main`.

1. Ouvrir une demande de fusion vers `main`. Vercel publie un aperçu.
2. Après fusion, la production se met à jour.
3. Framework **Other**, sans commande de build : les adresses sont des ancres, aucune réécriture n’est nécessaire.

## Polices

Le texte utilise `system-ui`. Les titres utilisent Georgia. Aucune police n’est téléchargée avec le site.
