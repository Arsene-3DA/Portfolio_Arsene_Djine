import * as home from "./home.js";
import * as cas from "./cas.js";
import * as projets from "./projets.js";
import * as projet from "./projet.js";
import * as outils from "./outils.js";
import * as parcours from "./parcours.js";
import * as contact from "./contact.js";
import * as missing from "./missing.js";

export const views = {
  accueil: home,
  cas,
  projets,
  projet,
  outils,
  parcours,
  contact,
  introuvable: missing
};
