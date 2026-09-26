import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Commandes from './pages/Commandes.jsx'
import Preparation from './pages/Preparation.jsx'
import Livraisons from './pages/Livraisons.jsx'
import Menu from './pages/Menu.jsx'
import Personnel from './pages/Personnel.jsx'
import Statistiques from './pages/Statistiques.jsx'
import Connexion from './pages/Connexion.jsx'
import { AuthProvider, useAuth } from './auth/AuthContext.jsx'
import { ROLE_HOME, ROUTE_ROLES } from './auth/roles.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Ici, contrairement a l'app client, la connexion EST necessaire :
// c'est l'outil du personnel (roles : CUISINE, GERANT, MANAGER, LIVREUR),
// pas l'app publique des clients. Chaque role est redirige vers son espace.

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
