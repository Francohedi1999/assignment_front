# Gestion des Assignments - Projet Mbds 2024 (Front)

![MongoDB](https://img.icons8.com/color/48/000000/mongodb.png)    ![Express.js](https://img.icons8.com/color/48/000000/express.png)    ![Angular](https://img.icons8.com/color/48/000000/angularjs.png)    ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png)

Ce projet est une application web développée en MEAN Stack (Mongo Express Angular Node) pour la gestion des devoirs dans un environnement éducatif. Elle permet aux administrateurs de gérer les utilisateurs et les matières, aux enseignants de créer et noter des devoirs, et aux étudiants de soumettre et consulter leurs devoirs. L'authentification est gérée à l'aide de JSON Web Tokens (JWT), assurant une sécurité robuste et un contrôle d'accès efficace.

## Déploiement
Lien vers la version déployée de l'application : [https://assignment-front-rxom.onrender.com](https://assignment-front-rxom.onrender.com/login)

## Auteurs
- 21 - RAKOTOBE Herinirina Angelo
- 30 - RAMAROTAFIKA Hedi Franco

  
## Fonctionnalités

### Admin
L'administrateur a le rôle central dans la gestion de l'application. Ses fonctionnalités sont :

#### Utilisateurs
- **Création d'utilisateurs** : L'admin peut créer des comptes pour les administrateurs, enseignants, et étudiants. Si une personne souhaite utiliser l'application web, elle doit d'abord demander un compte à l'admin.
- **Gestion des utilisateurs** : Liste avec pagination et filtres. L'admin peut voir les détails des utilisateurs, modifier leurs informations, et désactiver leurs comptes. Cela permet une gestion flexible et sécurisée des accès utilisateurs.

#### Matières
- **Gestion des matières** : L'admin peut ajouter, modifier ou supprimer des matières. Lors de l'ajout d'une matière, il doit fournir un nom, une image, et assigner un enseignant à la matière.
- **Drag and Drop** : Pour restaurer une matière supprimée, il suffit de la glisser dans le tableau principal des matières, avec une boîte de confirmation. Cette fonctionnalité permet d'éviter la suppression permanente des matières, offrant une sécurité supplémentaire et une facilité de récupération des données supprimées par erreur.

#### Assignations
- **Gestion des assignments** : Liste avec pagination et filtres. L'admin peut supprimer les devoirs créés, ce qui permet de maintenir la base de données propre et à jour.

### Enseignant
Les enseignants peuvent gérer leurs devoirs et suivre les performances de leurs étudiants.

#### Assignations
- **Création de devoirs** : Les enseignants peuvent créer de nouveaux devoirs pour leurs étudiants. Cela inclut la définition des détails du devoir et des délais.
- **Liste des devoirs** : Liste avec pagination et filtres. Les enseignants peuvent voir tous les devoirs qu'ils ont créés, ce qui permet un suivi efficace de leur travail.

#### Notes
- **Gestion des notes** : Pour chaque devoir, les enseignants peuvent voir la liste des étudiants, vérifier si les devoirs ont été rendus, et attribuer des notes et des remarques. Ils peuvent également modifier les notes si nécessaire, assurant une flexibilité dans l'évaluation.

### Étudiant
Les étudiants peuvent consulter et rendre leurs devoirs.

#### Assignations
- **Liste des devoirs** : Liste avec pagination et recherche par déscription du devoir pour voir tous les devoirs assignés.
- **Soumission de devoirs** : Les étudiants peuvent soumettre leurs devoirs via l'application. Une fois le devoir rendu, il ne peut plus être modifié, garantissant ainsi l'intégrité des soumissions.
- **Consultation des notes** : Les étudiants peuvent voir les notes et les remarques des devoirs rendus. Cette transparence permet aux étudiants de suivre leur performance et de s'améliorer.

## Authentification
L'application utilise JSON Web Tokens (JWT) pour gérer l'authentification des utilisateurs. Chaque utilisateur reçoit un token unique après une connexion réussie, qui est ensuite utilisé pour accéder aux différentes fonctionnalités de l'application de manière sécurisée.

## Pourquoi cette application ?
Cette application est conçue pour simplifier la gestion des devoirs dans un environnement éducatif. En centralisant toutes les opérations liées aux devoirs, elle facilite la communication entre les enseignants et les étudiants, améliore le suivi des performances académiques, et permet une gestion efficace des matières et des utilisateurs. L'utilisation de technologies modernes telles que Angular, Node.js, et MongoDB assure une application rapide, fiable, et évolutive.

### Pourquoi le Drag and Drop ?
Nous avons implémenté la fonctionnalité de drag and drop pour les matières pour d'éviter la suppression permanente des données. Plutôt que de supprimer immédiatement une matière de la base de données, elle est déplacée vers une liste de matières supprimées. Cette méthode offre plusieurs avantages :
- **Sécurité des données** : Prévention des suppressions accidentelles.
- **Facilité de restauration** : Les matières peuvent être facilement restaurées si elles ont été supprimées par erreur.
- **Flexibilité de gestion** : Permet aux administrateurs de gérer les matières de manière plus efficace et sécurisée.

## Identifiants pour les tests
1. Administrateur:
  - email:  administrateur@gmail.com
  - mdp:    0000
2. Enseignant:
  - email:  dayna@gmail.com
  - mdp:    0000
3. Etudiant:
  - email:  rasoa@gmail.com
  - mdp:    0000

## Installation
Pour installer et exécuter ce projet sur votre machine locale, suivez ces étapes :

1. Clonez ce dépôt sur votre machine locale :
   ```bash
   git clone https://github.com/Francohedi1999/assignment_front.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd assignment_front
   ```
3. Installez les dépendances du projet avec npm :
   ```bash
   npm install
   ```

## Utilisation en local
1. Démarrez l'application en exécutant la commande suivante :
   ```bash
   ng serve
   ```
2. Accédez à l'application dans votre navigateur à l'adresse : `http://localhost:4200`

## API et Technologies Utilisées
- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB
- **Frontend** : Angular, Angular Material, Bootstrap
- **Authentification** : JSON Web Tokens (JWT)
- **Notifications** : Spinners et toasts pour les messages de succès et d'erreur
