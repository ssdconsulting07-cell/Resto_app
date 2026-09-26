# SenYummies — Code

Monorepo du projet **SenYummies**, developpe pour le restaurant Chez Ketchup :
un backend commun (API) et deux frontends web (App Client et SenYummies
Manager) qui consomment cette meme API.

## Demarrage express par equipe

Vous venez de cloner tout le monorepo mais vous ne travaillez que dans un seul dossier ? Chaque dossier d'equipe a son propre README avec les commandes exactes pour demarrer :

- Equipe Backend -> `backend/README.md`
- Equipe App Client -> `app-client/README.md`
- Equipe Back-office -> `app-manager/README.md`

Ce README racine reste la reference pour les conventions partagees entre les 3 equipes (section plus bas).

## Structure

```
Code/
├── backend/            API commune - Spring Boot 3 (Java 17), MySQL
│   └── contrat-api/    openapi.yaml - contrat d'API, source de verite entre les 3 equipes
├── app-client/         App publique de commande (React + Vite) - clients, sans compte obligatoire
├── app-manager/        App interne "SenYummies Manager" (React + Vite) - staff/roles
├── docker-compose.yml  Backend + MySQL, environnement de dev partage
└── .env.example        Variables a copier dans un .env local avant `docker compose up`
```

Les maquettes de design (chez-ketchup-design-app1-v*.html) et les notes de
brainstorming restent au niveau du dossier parent `Chez Ketchup/` (pas dans
`Code/`), pour separer la "paperasse" (specs, design) du code.

## Demarrer avec Docker (recommande — backend + base partages entre les 3 equipes)

```
cp .env.example .env      # remplir les valeurs (mot de passe MySQL, secret JWT...)
docker compose up --build
```

Le backend est alors joignable sur `http://localhost:8080/api/v1` et la base
MySQL sur le port 3306.

## Demarrer le backend sans Docker

Prerequis : JDK 17+ et Maven (ou un IDE comme IntelliJ qui gere Maven tout seul).

```
cd backend
mvn spring-boot:run
```

Configurer la base MySQL dans `src/main/resources/application.properties`
avant de lancer (voir les placeholders a remplacer), ou pointer vers celle
lancee par `docker compose up mysql`.

Documentation API generee (Swagger UI) une fois lance :
`http://localhost:8080/api/v1/swagger-ui.html`.
Contrat d'API de reference, a versionner avec le code : `backend/contrat-api/openapi.yaml`.

## Demarrer un frontend (app-client ou app-manager)

Prerequis : Node.js 18+.

```
cd app-client      # ou app-manager
cp .env.example .env
npm install
npm run dev
```

## Organisation du backend — par fonctionnalite

Chaque paquet "fonctionnalite" regroupe son propre controleur, service,
repository, entite et DTO (pas de decoupage par couche technique global) :

- `auth/` — connexion (`POST /auth/login`), emission du JWT
- `produits/` — menu (consultation publique + gestion par le Gerant)
- `commandes/` — creation en mode invite, suivi, changement de statut par le staff
- `paiements/` — initialisation du paiement et webhook prestataire

Paquets transverses (infrastructure partagee, pas une fonctionnalite en soi) :

- `config/` — configuration Spring (securite, CORS pour les 2 frontends, etc.)
- `security/` — authentification JWT du staff SenYummies Manager (l'App Client reste toujours anonyme)
- `web/` — format d'erreur API standard (`ApiError`) et son gestionnaire global
- `payment/` — abstraction de paiement (`PaymentProvider`), pour brancher
  PayDunya au depart puis Wave/Orange Money en direct plus tard sans tout
  reecrire (voir decision dans les notes de brainstorming du projet)

## Conventions partagees entre les 3 equipes

1. **Contrat d'API d'abord** — `backend/contrat-api/openapi.yaml` est la
   source de verite ; Client et Back-office peuvent developper contre ce
   contrat avant que le code backend ne soit pret.
2. **Authentification par role** — un JWT porte le role du staff (`CUISINE`,
   `GERANT`, `MANAGER`, `LIVREUR`) ; l'App Client n'authentifie jamais ses
   utilisateurs.
3. **Versioning des routes** — toutes les routes sont servies sous `/api/v1`
   (`server.servlet.context-path`).
4. **Environnement partage** — `docker-compose.yml` fait tourner le backend
   et une base MySQL en continu, pour eviter que chaque equipe lance sa
   propre instance.
5. **Format d'erreur standard** — toute erreur API renvoie
   `{ code, message, field }` (voir `ApiError` / `GlobalExceptionHandler`).
6. **Revue croisee sur le contrat** — toute modification de
   `contrat-api/openapi.yaml` passe par une revue du lead Backend avant merge.

## Palette / identite (voir aussi le fichier theme.js de chaque frontend)

- Rouge : `#A6192E`
- Noir : `#141414`
- Blanc : `#FFFFFF`
