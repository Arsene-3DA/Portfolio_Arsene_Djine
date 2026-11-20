import * as home from "./home.js";
import * as services from "./services.js";
import * as donnees from "./donnees.js";
import * as projets from "./projets.js";
import * as projet from "./projet.js";
import * as cas from "./cas.js";
import * as apropos from "./apropos.js";
import * as contact from "./contact.js";
import * as missing from "./missing.js";

export const views = {
  accueil: home,
  services,
  donnees,
  projets,
  projet,
  cas,
  "a-propos": apropos,
  contact,
  introuvable: missing
};
