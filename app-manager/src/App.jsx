import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Commandes from './pages/Commandes.jsx'
import Preparation from './pages/Preparation.jsx'
import Livraisons from './pages/Livraisons.jsx'
import Menu from './pages/Menu.jsx'
import Personnel from './pages/Personnel.jsx'
import Statistiques from './pages/Statistiques.jsx'
import Connexion from './pages/Connexion.jsx'

// Ici, contrairement a l'app client, la connexion EST necessaire :
// c'est l'outil du personnel (roles : admin, manager, caissier, cuisine,
// preparation, livreur), pas l'app publique des clients.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Connexion />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/commandes" element={<Commandes />} />
        <Route path="/preparation" element={<Preparation />} />
        <Route path="/livraisons" element={<Livraisons />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/personnel" element={<Personnel />} />
        <Route path="/statistiques" element={<Statistiques />} />
      </Routes>
    </BrowserRouter>
  )
}
