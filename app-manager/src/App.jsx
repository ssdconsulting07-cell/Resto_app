import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Commandes from './features/cuisine/Commandes.jsx'
import Preparation from './features/cuisine/Preparation.jsx'
import Livraisons from './features/livreur/Livraisons.jsx'
import Menu from './features/gerant/Menu.jsx'
import Personnel from './features/manager/Personnel.jsx'
import Statistiques from './features/manager/Statistiques.jsx'
import Connexion from './pages/Connexion.jsx'
import { AuthProvider, useAuth } from './auth/AuthContext.jsx'
import { ROLE_HOME, ROUTE_ROLES } from './auth/roles.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Ici, contrairement a l'app client, la connexion EST necessaire :
// c'est l'outil du personnel (roles : CUISINE, GERANT, MANAGER, LIVREUR),
// pas l'app publique des clients. Chaque role est redirige vers son espace.
// Chaque ecran vit dans features/<role>/ (une equipe = ses dossiers,
// Connexion.jsx reste dans pages/ car commun aux 4 roles, avant qu'un
// role ne soit connu).

const PAGES = {
  '/commandes': Commandes,
  '/preparation': Preparation,
  '/livraisons': Livraisons,
  '/menu': Menu,
  '/personnel': Personnel,
  '/statistiques': Statistiques,
}

function RoleHome() {
  const { role } = useAuth()
  return <Navigate to={role ? ROLE_HOME[role] : '/login'} replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Connexion />} />
          {Object.entries(PAGES).map(([path, Page]) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute roles={ROUTE_ROLES[path]}>
                  <Page />
                </ProtectedRoute>
              }
            />
          ))}
          <Route path="*" element={<RoleHome />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
