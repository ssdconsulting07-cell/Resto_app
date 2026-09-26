import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Accueil from './pages/Accueil.jsx'
import ProduitDetail from './pages/ProduitDetail.jsx'
import Panier from './pages/Panier.jsx'
import Checkout from './pages/Checkout.jsx'
import Suivi from './pages/Suivi.jsx'
import Profil from './pages/Profil.jsx'
import Favoris from './pages/Favoris.jsx'
import Historique from './pages/Historique.jsx'

// Parcours (voir maquette v4, sans compte obligatoire) :
// Accueil -> ProduitDetail -> Panier -> Checkout (invite) -> Suivi
// + Profil / Favoris / Historique accessibles depuis la barre d'onglets

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/produit/:id" element={<ProduitDetail />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/suivi/:orderId" element={<Suivi />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/historique" element={<Historique />} />
      </Routes>
    </BrowserRouter>
  )
}
