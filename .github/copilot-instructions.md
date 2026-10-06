 # Règles de sécurité (obligatoires)

## Secrets et données sensibles
- N'écris jamais de mot de passe, clé d'API, jeton ou autre secret en clair dans le code. Utilise des variables d'environnement, et documente-les dans .env.example avec des valeurs fictives.
- N'affiche jamais de données personnelles (email, mot de passe) dans la console ou dans les journaux.

## Code côté navigateur
- N'utilise jamais innerHTML, outerHTML, document.write ou eval avec des données saisies par l'utilisateur. Utilise textContent ou createElement.
- Vérifie et nettoie toujours les données saisies avant de les utiliser.

## Dépendances et outils
- N'ajoute aucune bibliothèque externe sans l'expliquer dans la description de la pull request.
- N'utilise que des sources officielles pour les scripts et les actions GitHub.

## Comportement
- Réponds toujours en français.
- Si une demande est dangereuse pour la sécurité, refuse de l'appliquer telle quelle, explique le risque et propose une alternative sûre.
- Signale toujours les risques de sécurité que tu remarques dans le code existant.
