# Portfolio d’Arsène Dissi Djine

Site statique en français (Québec). Une seule personne, deux portes d’entrée : les **services web** pour les commerces de Gatineau et d’Ottawa, et le **profil données** (sécurité, qualité, Microsoft Fabric, Power BI).

Le contenu factuel reprend la version déjà publiée sur `main` (parcours, études de cas, dépôts GitHub, courriel, téléphone, formation, sculpture Three.js, réseau d’outils). Les textes se modifient dans un seul fichier.

## Lancer en local

Depuis la racine du dépôt :

```bash
python3 -m http.server 8765
```

Ouvrir [http://127.0.0.1:8765/](http://127.0.0.1:8765/). Aucune installation, aucun backend.

## Où modifier les textes

Tout le contenu éditorial est dans [`js/data.js`](js/data.js).

| Bloc | Clé |
| --- | --- |
| Nom, rôle, lieu, courriel, téléphone, GitHub | `profile` |
| Photo et LinkedIn | `gaps` |
| Offres et déroulement d’un mandat web | `services`, `processSteps` |
| Études de cas (Solydd, Desjardins, Frequentis) | `cases` |
| Projets, y compris les emplacements vides | `projects` |
| Parcours et formation | `parcours`, `formation` |
| Compétences | `skillGroups`, `pipeline` |

Le réseau d’outils (six logos) est le fichier [`assets/reseau-outils.svg`](assets/reseau-outils.svg), repris de la version précédente.

### À compléter

Ces valeurs valent exactement `À compléter` tant qu’elles ne sont pas remplacées. Elles s’affichent avec un encadré visible.

- `gaps.portrait` — chemin d’image, par exemple `assets/portrait.webp`
- `gaps.portraitAlt` — texte de remplacement de la photo
- `gaps.linkedin` — URL complète
- projets `a-venir-1` et `a-venir-2` — `title`, `summary`, `paragraphs`, et au besoin `url` ou `repo`

Ne pas inventer de client, de témoignage, de tarif chiffré, de métrique ni de diplôme. Les tarifs web restent « Tarifs sur demande ».

## Structure

```
index.html              coquille : en-tête, pied de page, zone des vues
css/styles.css          échelle typographique, couleurs, espacements
js/data.js              contenu
js/app.js               menu, titres, changement de vue
js/router.js            routes #/services, #/projet/africana, etc.
js/views/               une vue par page
js/sculpture.js         sculpture Three.js, chargée seulement sur l’accueil
js/tools.js             réseau d’outils, chargé sur la page Données
assets/fonts/           Fraunces et Source Sans 3, auto-hébergées
assets/projects/        capture du site Africana
```

Pages : Accueil, Services web, Données, Projets (et une fiche par projet), études de cas, À propos, Contact.

Le formulaire de contact ouvre le logiciel de courriel (`mailto:`). Aucun message n’est stocké, aucun service tiers de formulaire n’est branché.

## Déployer sur Vercel

Le dépôt est déjà relié au projet Vercel `port-djine`. La branche de production est `main`.

1. Ouvrir une demande de fusion vers `main`. Vercel publie un aperçu sur la demande.
2. Après fusion dans `main`, la production se met à jour.
3. Réglage : framework **Other** (site statique), commande de build vide, dossier de sortie à la racine. Aucun `vercel.json` n’est nécessaire : les adresses sont des ancres (`#/projets`), donc il n’y a pas de réécriture serveur.

## Animations

- Apparition au défilement : opacité et translation, via `IntersectionObserver`.
- Changement de vue : fondu court.
- Sculpture : Three.js (`three@0.160.0`), importé seulement quand le bloc est proche de l’écran, et seulement si l’utilisateur n’a pas demandé à réduire les animations. Le dessin suit le pointeur ; il n’y a pas de boucle d’animation continue. Sans WebGL, le losange CSS reste affiché.
- Réseau d’outils : le trait animé d’origine. Il se met en pause hors écran, avec le bouton « Mettre l’animation en pause », et il est coupé si `prefers-reduced-motion: reduce`.

## Polices et motifs

Fraunces et Source Sans 3 sont des polices SIL Open Font License. Les textes de licence sont dans `assets/fonts/`. Les motifs (losanges, bande kente) reprennent la palette du site Africana Marché Tropical : vert `#06452a`, crème `#fff9ef`, orangé `#c44700`, or `#a88445`. Les titres restent sur l’échelle du système : titre de page `2.5rem`, titre de section `2.125rem`, contenant `70rem`, en-tête `4.5rem`.
