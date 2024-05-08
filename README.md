# Projet API avec Express.js et Sequelize

## Objectif

Le projet vise à fournir un exemple d'API construite avec Express.js et Sequelize, illustrant les bonnes pratiques de conception et servant de référentiel d'apprentissage pour les étudiants.

## Contenu du Projet

-  `src/`: Contient le code source de l'application.
   -  `controllers/`: Contrôleurs pour gérer les requêtes HTTP.
   -  `models/`: Modèles Sequelize pour représenter les données.
   -  `routes/`: Définition des routes de l'API.
   -  `services/`: Logique métier pour manipuler les données.
   -  `utils/`: Utilitaires et gestion des erreurs.
   -  `app.js`: Point d'entrée de l'application.
-  `config/`: Configuration de la base de données.
-  `.env`: Fichier de configuration pour les variables d'environnement.

## Prérequis

-  Node.js et npm doivent être installés sur votre machine.

## Installation

1. Clonez ce référentiel sur votre machine.
2. Accédez au répertoire du projet.
3. Installez les dépendances.
4. Créez un fichier `.env` à la racine du projet et définissez les variables d'environnement requises.

# Fichier .env

```
PORT=3000
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=anselme
DB_NAME=api
```

## Création d'un modèle avec Sequelize et exécution des migrations

1. **Création d'un modèle Sequelize** :

```bash
npx sequelize-cli model:generate --name NomDeTaTable --attributes firstName:string,lastName:string,email:string

```

2. **Exécution des migrations :** :

```bash
npm run migrate

```

## Démarrage

-  Utilisez la commande `npm start` pour démarrer le serveur.

## Endpoints

-  `GET /api/users`: Récupère tous les utilisateurs.
-  `GET /api/users/:userId`: Récupère un utilisateur par son ID.
-  `POST /api/users`: Crée un nouvel utilisateur.
-  `PUT /api/users/:userId`: Met à jour un utilisateur existant.
-  `DELETE /api/users/:userId`: Supprime un utilisateur.

## Contribuer

-  Les contributions sont les bienvenues !
-  Forkez le projet, créez une branche pour votre fonctionnalité, committez vos modifications, puis créez une nouvelle Pull Request.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
