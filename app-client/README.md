# App Client — SenYummies (équipe App Client)

Vitrine publique de commande : menu, panier, checkout invité (sans compte), suivi de commande. Stack : React 18 + Vite.

## Démarrage rapide

Après avoir cloné tout le monorepo (`Code/`), vous n'avez besoin que de ce dossier :

```
cd app-client
cp .env.example .env
npm install
npm run dev
```

L'app tourne sur `http://localhost:5173` (port par défaut Vite). Elle attend le backend sur `http://localhost:8080/api/v1` (voir `VITE_API_BASE_URL` dans `.env`) — lancez-le depuis la racine (`docker compose up --build`) ou demandez à l'équipe Backend de le lancer sur l'environnement partagé.

Autres scripts : `npm run build` (build de prod), `npm run preview` (prévisualiser le build).

## Où travailler — organisation par fonctionnalité

Le code est organisé par fonctionnalité dans `src/features/`, pas par type de fichier :

- `features/produits/` — Accueil (menu), Détail produit
- `features/commandes/` — Panier, Checkout (invité), Suivi de commande
- `features/profil/` — Profil, Favoris, Historique

Chaque écran est encore un placeholder à remplir (voir la spec équipe pour le détail par écran).

- `src/api/client.js` — client HTTP déjà configuré : base `/api/v1`, gère le format d'erreur standard (`{ code, message, field }`) exposé sur l'erreur JS levée. À utiliser pour tous les appels API, pas de `fetch` brut.
- `src/theme.js` — palette de marque : rouge `#A6192E`, noir `#141414`, blanc `#FFFFFF`, Poppins.

## Rappels

- **Jamais de compte obligatoire** : le checkout reste invité (nom optionnel, téléphone, adresse) — pas de mot de passe, pas d'écran de connexion.
- Le paiement se fait derrière l'API backend (`PaymentProvider`), jamais d'appel direct à un prestataire depuis le frontend.
- Conventions complètes partagées entre les 3 équipes : voir le `README.md` à la racine de `Code/`.
