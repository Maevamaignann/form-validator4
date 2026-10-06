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
