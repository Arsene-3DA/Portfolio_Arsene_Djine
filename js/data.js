/**
 * Contenu du portfolio — seul fichier à modifier pour les textes.
 *
 * Les faits (parcours, études de cas, dépôts, courriel, téléphone,
 * formation) reprennent la version publiée par Arsène sur main.
 * Ne pas ajouter de client, de témoignage, de chiffre, de diplôme
 * ni de tarif qui n’y figure pas.
 *
 * À COMPLÉTER (valeur exacte « À compléter », ou tableau à remplir) :
 * - gaps.portrait        chemin d’image, ex. "assets/portrait.webp"
 * - gaps.portraitAlt     texte de remplacement de la photo
 * - gaps.linkedin        URL https://… ou laisser « À compléter »
 * - projects dont placeholder === true (slug a-venir-1 et a-venir-2) :
 *     title, summary, paragraphs, url, repo
 */

export const MISSING = "À compléter";

export const profile = {
  name: "Arsène Dissi Djine",
  wordmark: "Arsène Djine",
  role: "Analyste en sécurité des données",
  location: "Gatineau, Québec",
  region: "Gatineau et Ottawa",
  lead: "Qui peut consulter une donnée financière? Comment savoir si un rapport reproduit fidèlement les montants à la source? Ces questions guident mon travail, de la gestion des accès dans Microsoft Fabric aux contrôles de qualité en SQL.",
  email: "systemdissi@hotmail.com",
  phoneDisplay: "873-655-5275",
  phoneTel: "+18736555275",
  github: "https://github.com/Arsene-3DA",
  githubHandle: "Arsene-3DA"
};

export const gaps = {
  portrait: MISSING,
  portraitAlt: MISSING,
  linkedin: MISSING
};

export const paths = [
  {
    href: "#/services",
    eyebrow: "Services web",
    title: "Un site clair pour votre commerce",
    text: "Création de site vitrine, refonte, référencement local et entretien, pour les commerces de Gatineau et d’Ottawa. Tarifs sur demande."
  },
  {
    href: "#/donnees",
    eyebrow: "Données",
    title: "Qualité, accès et tableaux de bord",
    text: profile.lead
  }
];

export const services = [
  {
    title: "Création de site vitrine",
    text: "Un site statique qui présente l’activité, les services, l’adresse et un moyen de vous joindre. Les pages sont lisibles sur téléphone, en français."
  },
  {
    title: "Refonte",
    text: "Reprendre un site déjà en ligne : structure, lecture sur petit écran, clarté des textes et poids des pages. On part de ce qui existe."
  },
  {
    title: "Référencement local",
    text: "Titres, descriptions, nom et zone desservie écrits de façon cohérente, pour une recherche à Gatineau ou à Ottawa. J’accompagne aussi la fiche Google Business lorsque vous en avez une. Aucune position n’est garantie."
  },
  {
    title: "Entretien",
    text: "Après la mise en ligne : correction, horaire, texte ou photo. Le rythme se convient au cas par cas."
  }
];

export const processSteps = [
  {
    title: "Découverte",
    text: "On précise l’activité, les personnes visées et ce que le site doit permettre : vous trouver, vous écrire, comprendre l’offre."
  },
  {
    title: "Maquette",
    text: "Une proposition de pages et de textes, à valider avant d’écrire le code."
  },
  {
    title: "Développement",
    text: "Site statique, sans compte obligatoire ni formulaire hébergé chez un tiers. Le même soin de lecture sur téléphone que sur grand écran."
  },
  {
    title: "Mise en ligne",
    text: "Publication, puis les bases utiles au référencement local : titres, description, nom et zone cohérents."
  },
  {
    title: "Suivi",
    text: "Corrections et petites mises à jour convenues ensemble, une fois le site en ligne."
  }
];

export const cases = [
  {
    slug: "solydd",
    kicker: "Solydd",
    title: "Suivre les accès aux données",
    summary: "J’ai centralisé les données de SQL Server et de SharePoint dans un Lakehouse Microsoft Fabric pour alimenter Power BI. J’ai géré les autorisations sur les vues avec des groupes Entra ID et analysé les journaux d’accès avec KQL.",
    demoTitle: "Démonstration KQL",
    demoNote: "Dans ce journal fictif, deux lectures refusées invitent à vérifier les droits du groupe Finance.",
    codeLang: "kql",
    code: `datatable(Groupe:string, Action:string, Résultat:string)
[
  "Finance", "Lecture", "Refusé",
  "Finance", "Lecture", "Refusé",
  "BI",      "Lecture", "Autorisé"
]
| where Résultat == "Refusé"
| summarize Refus=count() by Groupe, Action`
  },
  {
    slug: "desjardins",
    kicker: "Desjardins",
    title: "Retrouver un écart de réconciliation",
    summary: "J’ai automatisé les tests de qualité et comparé les données sources aux données transformées avant leur mise en production. J’ai aussi documenté leur parcours pour les audits financiers.",
    demoTitle: "Démonstration SQL",
    demoNote: "Le lot fictif A contient deux écritures de 60 et 40 dollars. Le contrôle signale les 5 dollars manquants dans le total transformé.",
    codeLang: "sql",
    code: `WITH ecritures AS (
  SELECT * FROM (VALUES ('A', 60), ('A', 40)) v(lot, montant)
), rapport AS (
  SELECT 'A' AS lot, 95 AS total
)
SELECT e.lot, SUM(e.montant) - r.total AS ecart
FROM ecritures e JOIN rapport r ON e.lot = r.lot
GROUP BY e.lot, r.total
HAVING SUM(e.montant) <> r.total;`
  },
  {
    slug: "frequentis",
    kicker: "Frequentis",
    title: "Reprendre un flux interrompu",
    summary: "J’ai configuré des alertes, mis en œuvre des sauvegardes et participé à la résolution d’incidents d’infrastructure en soutien de niveaux 2 et 3.",
    demoTitle: "Scénario illustratif",
    steps: [
      "Une alerte indique que le chargement attendu à 8 h est absent.",
      "Consulter le journal du traitement et identifier le dernier lot complet.",
      "Restaurer la sauvegarde dans un environnement de vérification et rejouer le lot interrompu.",
      "Comparer les volumes et les totaux à la source, vérifier les doublons, puis reprendre les traitements."
    ]
  }
];

export const pipeline = [
  {
    name: "Python",
    text: "Scripts et préparation. Le dépôt Data_Projet inclut un script Python de connexion à la base."
  },
  {
    name: "SQL",
    text: "Requêtes et contrôles de qualité. L’étude Desjardins compare un total source au total transformé."
  },
  {
    name: "Microsoft Fabric",
    text: "Lakehouse pour réunir SQL Server et SharePoint, comme dans l’étude Solydd, avant Power BI."
  },
  {
    name: "Power BI",
    text: "Tableaux de bord alimentés par les vues du Lakehouse. Les droits passent par des groupes Entra ID."
  }
];

export const toolNetwork = {
  title: "Mon environnement de travail",
  description: "SQL Server, Python et Power BI pour les données. GitHub, Docker et Terraform pour le développement et le déploiement.",
  file: "assets/reseau-outils.svg"
};

export const skillGroups = [
  {
    title: "Données et analytique",
    items: "SQL Server, Microsoft Fabric, OneLake, Lakehouse, Warehouse, Power BI, Airflow et dbt"
  },
  {
    title: "Sécurité et surveillance",
    items: "Microsoft Sentinel, Defender XDR, Entra ID, Azure Log Analytics, KQL, Palo Alto et Fortinet"
  },
  {
    title: "Développement et exploitation",
    items: "Python, Java, C#, PowerShell, GitHub, Terraform, Docker et Windows Server"
  },
  {
    title: "Applications métier",
    items: "Dynamics 365, SharePoint, Teams, Power Apps et Excel"
  },
  {
    title: "Outils d’IA",
    items: "Codex, Claude Code et Grok"
  }
];

export const parcours = [
  {
    when: "Oct. 2024 – aujourd’hui · Gatineau",
    title: "Centre de services scolaire au Cœur-des-Vallées",
    text: "Suppléant au primaire et au secondaire. J’enseigne notamment les mathématiques et l’informatique. Expliquer une intégrale ou un algorithme m’a appris à partir des questions de mon interlocuteur."
  },
  {
    when: "Nov. 2024 – janv. 2026 · Montréal",
    title: "Solydd",
    text: "Spécialiste en ingénierie de données sur Microsoft Fabric et Azure. Migration ETL vers ELT, automatisation des déploiements et documentation des dépendances."
  },
  {
    when: "Sept. 2020 – mai 2023 · Montréal",
    title: "Desjardins",
    text: "Spécialiste en ingénierie des données. Qualité des données financières, réconciliation pour le SOC et traçabilité des transformations."
  },
  {
    when: "Janv. – août 2020 · Gatineau",
    title: "Frequentis",
    text: "Stagiaire en administration infonuagique. Provisionnement automatisé, surveillance des traitements et reprise après sinistre."
  },
  {
    when: "Janv. 2016 – sept. 2018 · Genève",
    title: "Secrets de Data",
    text: "Développeur d’applications C# et .NET. Formulaires, contrôles de saisie, requêtes SQL et validation des correctifs."
  }
];

export const formation = [
  { title: "Baccalauréat en génie informatique", detail: "Université du Québec en Outaouais · Gatineau" },
  { title: "Génie logiciel", detail: "Collège communautaire du Nouveau-Brunswick" },
  { title: "Microsoft · SC-200", detail: "Analyste des opérations de sécurité associé" }
];

export const projects = [
  {
    slug: "africana",
    title: "Africana Marché Tropical",
    summary: "Site vitrine et catalogue de produits pour une épicerie africaine et tropicale à Gatineau.",
    paragraphs: [
      "Site vitrine et catalogue de produits pour Africana Marché Tropical, épicerie africaine et tropicale à Gatineau.",
      "Le site publié est statique : HTML, CSS et JavaScript, avec un routage par ancre. La visite du magasin s’appuie sur une scène Three.js.",
      "La capture ci-dessous montre la page d’accueil en ligne. Aucun chiffre de fréquentation n’est indiqué ici."
    ],
    statusLabel: "En ligne",
    url: "https://africana-marche-tropical.vercel.app",
    urlLabel: "Voir le site",
    repo: "https://github.com/Arsene-3DA/Test",
    repoLabel: "Dépôt Test",
    image: "assets/projects/africana.webp",
    imageAlt: "Page d’accueil du site Africana Marché Tropical, épicerie à Gatineau",
    imageWidth: 1200,
    imageHeight: 634,
    tags: ["HTML, CSS, JavaScript", "Routage par ancre", "Three.js"]
  },
  {
    slug: "shopping-data",
    title: "Analyser des données de commerce avec Microsoft Fabric",
    summary: "Commandes et produits en CSV, avis clients en JSON et journaux web constituent les jeux de données de cet atelier. Les notebooks Silver et Gold illustrent les étapes de transformation du Lakehouse.",
    paragraphs: [
      "Commandes et produits en CSV, avis clients en JSON et journaux web constituent les jeux de données de cet atelier. Les notebooks Silver et Gold illustrent les étapes de transformation du Lakehouse."
    ],
    statusLabel: "Dépôt GitHub",
    repo: "https://github.com/Arsene-3DA/Shopping_Data",
    repoLabel: "Explorer Shopping_Data",
    tags: ["Microsoft Fabric", "Lakehouse"]
  },
  {
    slug: "entrepot",
    title: "Réunir les données CRM et ERP",
    summary: "Ce projet d’entrepôt de données rassemble deux sources métier. La procédure SQL de chargement de la couche Bronze constitue le point d’entrée pour comprendre l’alimentation de l’entrepôt.",
    paragraphs: [
      "Ce projet d’entrepôt de données rassemble deux sources métier. La procédure SQL de chargement de la couche Bronze constitue le point d’entrée pour comprendre l’alimentation de l’entrepôt."
    ],
    statusLabel: "Dépôt GitHub",
    repo: "https://github.com/Arsene-3DA/Data_Projet_Warehouse",
    repoLabel: "Explorer Data_Projet_Warehouse",
    tags: ["SQL", "Entrepôt"]
  },
  {
    slug: "fincorp",
    title: "Concevoir un lac de données réglementaires sur GCP",
    summary: "Le schéma d’architecture de Fincorp décrit le parcours envisagé pour des données de l’OSFI, depuis Cloud Storage jusqu’au tableau de bord, en passant par les couches Bronze, Silver et Gold dans BigQuery.",
    paragraphs: [
      "Le schéma d’architecture de Fincorp décrit le parcours envisagé pour des données de l’OSFI, depuis Cloud Storage jusqu’au tableau de bord, en passant par les couches Bronze, Silver et Gold dans BigQuery."
    ],
    statusLabel: "Dépôt GitHub",
    repo: "https://github.com/Arsene-3DA/-fincorp-data-platform",
    repoLabel: "Explorer -fincorp-data-platform",
    tags: ["GCP", "BigQuery"]
  },
  {
    slug: "catalogue-films",
    title: "Interroger un catalogue de films en SQL",
    summary: "Un carnet d’exercices SQL part de questions sur les films, comme la recherche du coût de remplacement le plus bas. Le dépôt inclut également un script Python de connexion à la base de données.",
    paragraphs: [
      "Un carnet d’exercices SQL part de questions sur les films, comme la recherche du coût de remplacement le plus bas. Le dépôt inclut également un script Python de connexion à la base de données."
    ],
    statusLabel: "Dépôt GitHub",
    repo: "https://github.com/Arsene-3DA/Data_Projet",
    repoLabel: "Explorer Data_Projet",
    tags: ["SQL", "Python"]
  },
  {
    slug: "antidopage",
    title: "Anticiper les dossiers en retard",
    summary: "Étude de faisabilité, en préparation : une idée d’outil pour aider un laboratoire antidopage à repérer les dossiers qui risquent d’être en retard.",
    paragraphs: [
      "Étude de faisabilité, en préparation. L’idée : un outil pour aider un laboratoire antidopage à repérer les dossiers qui risquent d’être en retard.",
      "La piste technique prévue repose sur Python, SQL, Microsoft Fabric et Power BI.",
      "Aucun résultat, aucun délai mesuré et aucun jeu de données ne sont présentés, parce que le travail n’est pas terminé."
    ],
    statusLabel: "En cours",
    badge: "progress",
    tags: ["Python", "SQL", "Microsoft Fabric", "Power BI"]
  },
  {
    slug: "a-venir-1",
    title: "Projet à venir",
    summary: MISSING,
    paragraphs: [MISSING],
    statusLabel: "Projet à venir",
    badge: "later",
    placeholder: true
  },
  {
    slug: "a-venir-2",
    title: "Projet à venir",
    summary: MISSING,
    paragraphs: [MISSING],
    statusLabel: "Projet à venir",
    badge: "later",
    placeholder: true
  }
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug) || null;
}

export function getCase(slug) {
  return cases.find((item) => item.slug === slug) || null;
}

export function isMissing(value) {
  return value == null || String(value).trim() === "" || String(value).trim() === MISSING;
}

export function pageMeta(route) {
  const name = profile.name;
  if (route.view === "services") {
    return {
      title: `Services web | ${name}`,
      description: "Création de site vitrine, refonte, référencement local et entretien pour les commerces de Gatineau et d’Ottawa. Tarifs sur demande."
    };
  }
  if (route.view === "donnees") {
    return {
      title: `Données | ${name}`,
      description: profile.lead
    };
  }
  if (route.view === "projets") {
    return {
      title: `Projets | ${name}`,
      description: "Réalisations web et dépôts de données : Africana Marché Tropical, ateliers Fabric, entrepôt, lac réglementaire et exercices SQL."
    };
  }
  if (route.view === "projet") {
    const project = getProject(route.slug);
    return {
      title: project ? `${project.title} | ${name}` : `Projet | ${name}`,
      description: project?.summary || "Projet du portfolio d’Arsène Dissi Djine."
    };
  }
  if (route.view === "cas") {
    const item = getCase(route.slug);
    return {
      title: item ? `${item.kicker} · ${item.title} | ${name}` : `Étude de cas | ${name}`,
      description: item?.summary || "Étude de cas du portfolio d’Arsène Dissi Djine."
    };
  }
  if (route.view === "a-propos") {
    return {
      title: `À propos | ${name}`,
      description: `${profile.role}, ${profile.location}. Parcours, formation et certification tels que publiés sur ce portfolio.`
    };
  }
  if (route.view === "contact") {
    return {
      title: `Contact | ${name}`,
      description: `Écrire à ${profile.name} : ${profile.email}, ${profile.phoneDisplay}, GitHub ${profile.githubHandle}.`
    };
  }
  if (route.view === "introuvable") {
    return {
      title: `Page introuvable | ${name}`,
      description: "Cette adresse ne correspond à aucune page du portfolio."
    };
  }
  return {
    title: `${name} | ${profile.role}`,
    description: `${profile.role} à ${profile.location}. Sites pour les commerces locaux, et études de cas en données.`
  };
}
