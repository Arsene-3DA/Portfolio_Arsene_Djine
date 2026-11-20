/** Textes repris de index.html au commit 7710bdd. */

export const profile = {
  name: "Arsène Dissi Djine",
  wordmark: "ARSÈNE DJINE",
  role: "Analyste en sécurité des données",
  location: "Gatineau, Québec",
  lead: "Qui peut consulter une donnée financière? Comment savoir si un rapport reproduit fidèlement les montants à la source? Ces questions guident mon travail, de la gestion des accès dans Microsoft Fabric aux contrôles de qualité en SQL.",
  email: "systemdissi@hotmail.com",
  phoneDisplay: "873-655-5275",
  phoneTel: "+18736555275",
  github: "https://github.com/Arsene-3DA",
  githubLabel: "GitHub"
};

export const cases = [
  {
    slug: "solydd",
    summaryLabel: "Solydd · Suivre les accès aux données",
    text: "J’ai centralisé les données de SQL Server et de SharePoint dans un Lakehouse Microsoft Fabric pour alimenter Power BI. J’ai géré les autorisations sur les vues avec des groupes Entra ID et analysé les journaux d’accès avec KQL.",
    demoTitle: "Démonstration KQL",
    demoNote: "Dans ce journal fictif, deux lectures refusées invitent à vérifier les droits du groupe Finance.",
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
    summaryLabel: "Desjardins · Retrouver un écart de réconciliation",
    text: "J’ai automatisé les tests de qualité et comparé les données sources aux données transformées avant leur mise en production. J’ai aussi documenté leur parcours pour les audits financiers.",
    demoTitle: "Démonstration SQL",
    demoNote: "Le lot fictif A contient deux écritures de 60 et 40 dollars. Le contrôle signale les 5 dollars manquants dans le total transformé.",
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
    summaryLabel: "Frequentis · Reprendre un flux interrompu",
    text: "J’ai configuré des alertes, mis en œuvre des sauvegardes et participé à la résolution d’incidents d’infrastructure en soutien de niveaux 2 et 3.",
    demoTitle: "Scénario illustratif",
    steps: [
      "Une alerte indique que le chargement attendu à 8 h est absent.",
      "Consulter le journal du traitement et identifier le dernier lot complet.",
      "Restaurer la sauvegarde dans un environnement de vérification et rejouer le lot interrompu.",
      "Comparer les volumes et les totaux à la source, vérifier les doublons, puis reprendre les traitements."
    ]
  }
];

export const projects = [
  {
    title: "Analyser des données de commerce avec Microsoft Fabric",
    text: "Commandes et produits en CSV, avis clients en JSON et journaux web constituent les jeux de données de cet atelier. Les notebooks Silver et Gold illustrent les étapes de transformation du Lakehouse.",
    url: "https://github.com/Arsene-3DA/Shopping_Data",
    link: "Explorer Shopping_Data sur GitHub ↗"
  },
  {
    title: "Réunir les données CRM et ERP",
    text: "Ce projet d’entrepôt de données rassemble deux sources métier. La procédure SQL de chargement de la couche Bronze constitue le point d’entrée pour comprendre l’alimentation de l’entrepôt.",
    url: "https://github.com/Arsene-3DA/Data_Projet_Warehouse",
    link: "Explorer Data_Projet_Warehouse sur GitHub ↗"
  },
  {
    title: "Concevoir un lac de données réglementaires sur GCP",
    text: "Le schéma d’architecture de Fincorp décrit le parcours envisagé pour des données de l’OSFI, depuis Cloud Storage jusqu’au tableau de bord, en passant par les couches Bronze, Silver et Gold dans BigQuery.",
    url: "https://github.com/Arsene-3DA/-fincorp-data-platform",
    link: "Explorer -fincorp-data-platform sur GitHub ↗"
  },
  {
    title: "Interroger un catalogue de films en SQL",
    text: "Un carnet d’exercices SQL part de questions sur les films, comme la recherche du coût de remplacement le plus bas. Le dépôt inclut également un script Python de connexion à la base de données.",
    url: "https://github.com/Arsene-3DA/Data_Projet",
    link: "Explorer Data_Projet sur GitHub ↗"
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

export const skillGroups = [
  { title: "Données et analytique", items: "SQL Server, Microsoft Fabric, OneLake, Lakehouse, Warehouse, Power BI, Airflow et dbt" },
  { title: "Sécurité et surveillance", items: "Microsoft Sentinel, Defender XDR, Entra ID, Azure Log Analytics, KQL, Palo Alto et Fortinet" },
  { title: "Développement et exploitation", items: "Python, Java, C#, PowerShell, GitHub, Terraform, Docker et Windows Server" },
  { title: "Applications métier", items: "Dynamics 365, SharePoint, Teams, Power Apps et Excel" },
  { title: "Outils d’IA", items: "Codex, Claude Code et Grok" }
];

export const formation = [
  { title: "Baccalauréat en génie informatique", detail: "Université du Québec en Outaouais · Gatineau" },
  { title: "Génie logiciel", detail: "Collège communautaire du Nouveau-Brunswick" },
  { title: "Microsoft · SC-200", detail: "Analyste des opérations de sécurité associé" }
];

export const toolNetwork = {
  title: "Mon environnement de travail",
  description: "SQL Server, Python et Power BI pour les données. GitHub, Docker et Terraform pour le développement et le déploiement.",
  file: "assets/reseau-outils.svg"
};

export function getCase(slug) {
  return cases.find((item) => item.slug === slug) || null;
}

export function pageMeta(route) {
  const base = `${profile.name} | Sécurité des données`;
  if (route.view === "cas") return { title: `Études de cas | ${profile.name}`, description: cases[0].text };
  if (route.view === "projets") return { title: `Projets GitHub | ${profile.name}`, description: projects[0].text };
  if (route.view === "outils") return { title: `Outils | ${profile.name}`, description: toolNetwork.description };
  if (route.view === "parcours") return { title: `Parcours | ${profile.name}`, description: parcours[1].text };
  if (route.view === "contact") return { title: `Contact | ${profile.name}`, description: `${profile.email}, ${profile.phoneDisplay}` };
  if (route.view === "introuvable") return { title: `Page introuvable | ${profile.name}`, description: "Cette adresse ne correspond à aucune page du portfolio." };
  return { title: base, description: profile.lead };
}
