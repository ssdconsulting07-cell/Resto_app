# Backend — SenYummies (équipe Backend)

API commune consommée par `app-client` et `app-manager`. Stack : Spring Boot 3, Java 17, MySQL, Spring Security + JWT.

## Démarrage rapide

Après avoir cloné tout le monorepo (`Code/`), vous n'avez besoin que de ce dossier pour coder — mais le backend + MySQL tournent depuis la racine du repo.

**Option recommandée (backend + MySQL ensemble, partagés entre les 3 équipes) :**

```
cd ..                        # revenir à la racine Code/
cp .env.example .env         # remplir les valeurs (mot de passe MySQL, secret JWT...)
docker compose up --build
```

Le backend est alors sur `http://localhost:8080/api/v1`, Swagger UI sur `http://localhost:8080/api/v1/swagger-ui.html`.

**Option locale (sans Docker), prérequis JDK 17 + Maven :**

```
cd backend
mvn spring-boot:run
```

Il faut alors une base MySQL déjà accessible en local — configurer `src/main/resources/application.properties` (ou pointer sur celle lancée par `docker compose up mysql` depuis la racine).

## Où travailler — organisation par fonctionnalité

Le code est organisé par fonctionnalité, pas par couche technique : chaque paquet ci-dessous regroupe son propre contrôleur, service, repository, entité et DTO.

- `auth/` — connexion (`POST /auth/login`), émission du JWT (vide, à remplir)
- `produits/` — menu : consultation publique + gestion par le Gérant (vide, à remplir)
- `commandes/` — création en mode invité, suivi, changement de statut par le staff (vide, à remplir)
- `paiements/` — initialisation du paiement et webhook prestataire (vide, à remplir)

Paquets transverses déjà posés (infrastructure partagée entre toutes les fonctionnalités, à consommer, pas à refaire) :

- `config/`, `security/`, `web/` — sécurité JWT, CORS, format d'erreur standard `ApiError`
- `payment/` — interface `PaymentProvider`, en attendant le choix PayDunya vs API directe (décision PDG en cours)
- `contrat-api/openapi.yaml` — **le contrat d'API, source de vérité** entre les 3 équipes, organisé par les mêmes 4 domaines (auth, produits, commandes, paiements). Toute modification passe par une revue du lead Backend avant merge (voir conventions dans le README racine).

## Rappels

- Toutes les routes sous `/api/v1` (déjà configuré, ne pas dupliquer le préfixe dans les `@RequestMapping`).
- Un rôle par JWT (`CUISINE`, `GERANT`, `MANAGER`, `LIVREUR`) — l'App Client reste toujours anonyme, jamais de compte côté client.
- Conventions complètes partagées entre les 3 équipes : voir le `README.md` à la racine de `Code/`.
