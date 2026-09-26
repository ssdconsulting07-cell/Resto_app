# SenYummies Manager — Back-office (équipe Back-office)

Application interne par rôle : Cuisine, Gérant, Manager, Livreur. Stack : React 18 + Vite, authentification JWT.

## Démarrage rapide

Après avoir cloné tout le monorepo (`Code/`), vous n'avez besoin que de ce dossier :

```
cd app-manager
cp .env.example .env
npm install
npm run dev
```

L'app tourne sur `http://localhost:5174` (ou le port suivant si 5173 est déjà pris par app-client). Elle attend le backend sur `http://localhost:8080/api/v1` (voir `VITE_API_BASE_URL` dans `.env`) — lancez-le depuis la racine (`docker compose up --build`) ou demandez à l'équipe Backend.

Autres scripts : `npm run build` (build de prod), `npm run preview` (prévisualiser le build).

## Où en est-on

Déjà fait (mergé dans `develop`, PR #1) :
- `pages/Connexion.jsx` — connexion par rôle avec redirection automatique (Cuisine → `/commandes`, Gérant → `/menu`, Manager → `/statistiques`, Livreur → `/livraisons`).
- `components/ProtectedRoute.jsx`, `auth/AuthContext.jsx`, `auth/roles.js` — routes protégées par rôle, déconnexion auto sur 401.
- `pages/Commandes.jsx` — écran Cuisine : commandes payées/en préparation triées par ordre d'arrivée, progression Reçue → En préparation → Prête.
- `auth/transitions.js` — table des transitions de statut autorisées par rôle.

Reste à faire (placeholders déjà en place dans `pages/`, à compléter) :
- `pages/Menu.jsx` — espace Gérant (CRUD menu, prix, disponibilité).
- `pages/Statistiques.jsx` — espace Manager (entrées/sorties argent et produit).
- `pages/Livraisons.jsx` — espace Livreur. **Point ouvert non tranché** : transition Prête → En livraison (attribution manuelle vs auto) et Prête → Retirée — à définir avec l'équipe avant de coder cette partie.
- `pages/Preparation.jsx`, `pages/Personnel.jsx`, `pages/Dashboard.jsx` — hors périmètre MVP actuel, laissés en placeholder pour la V2.

## Rappels

- `src/api/client.js` — client HTTP déjà configuré (auth JWT via `setAuthToken`/`authHeaders`, gère le format d'erreur standard `{ code, message, field }`). À utiliser pour tous les appels API.
- Un rôle = un espace dédié ; ne jamais mélanger la logique de plusieurs rôles dans un même écran.
- Conventions complètes partagées entre les 3 équipes : voir le `README.md` à la racine de `Code/`.
