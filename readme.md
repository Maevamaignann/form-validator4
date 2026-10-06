[![CI](https://github.com/Maevamaignann/form-validator4/actions/workflows/ci.yml/badge.svg)](https://github.com/Maevamaignann/form-validator4/actions/workflows/ci.yml)

## Form Validator (Intro Project)

Simple client side form validation. Check required, length, email and password match

## Project Specifications

- Create form UI
- Show error messages under specific inputs
- checkRequired() to accept array of inputs
- checkLength() to check min and max length
- checkEmail() to validate email with regex
- checkPasswordsMatch() to match confirm password

## Chaîne CI/CD

La chaîne CI est exécutée à chaque pull request et à chaque push sur `main`. Elle contient trois vérifications séparées :

- **Qualité du code** : exécution de ESLint (JavaScript), Stylelint (CSS) et HTMLHint (HTML).
- **Tests automatisés** : lancement des tests Node.js avec `node --test` et `jsdom` sur les fonctions de validation.
- **Vérification des fichiers** : contrôle de la présence des fichiers essentiels du site statique.

Le déploiement CD vers GitHub Pages est déclenché uniquement après la fin du workflow CI, et seulement si la CI est **réussie** sur la branche `main`.

## Automatisations GitHub Actions (exploitation)

Trois workflows classiques complètent la CI/CD pour l'exploitation continue du site GitHub Pages :

- **Surveillance de disponibilité** (`.github/workflows/surveillance.yml`) : exécution toutes les heures (et à la demande) pour vérifier que la page d'accueil, `script.js` et `style.css` répondent en HTTP 200. En cas d'échec, une issue **🚨 Site indisponible** étiquetée `incident` est ouverte sans doublon ; elle est fermée automatiquement avec un commentaire dès le rétablissement.
- **Vérification des liens** (`.github/workflows/liens.yml`) : exécution hebdomadaire le lundi à 8h (heure de Paris, avec prise en compte du changement d'heure) via **lychee**, plus lancement manuel possible. Une issue est créée avec le rapport complet si des liens cassés sont détectés.
- **Ménage des issues** (`.github/workflows/menage.yml`) : exécution quotidienne pour marquer `inactive` les issues sans activité depuis 30 jours, puis fermeture automatique 7 jours après. Les issues portant le label `incident` sont toujours exclues.
