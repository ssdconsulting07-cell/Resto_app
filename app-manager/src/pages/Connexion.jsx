import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { ROLE_HOME, ROUTE_ROLES } from '../auth/roles.js'
import { colors, fontFamily } from '../theme.js'

// Apres connexion : retour a l'ecran demande s'il est permis pour ce role,
// sinon espace par defaut du role (ROLE_HOME).
function destinationFor(role, from) {
  return from && ROUTE_ROLES[from]?.includes(role) ? from : ROLE_HOME[role]
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '10px 12px',
  border: `1px solid ${colors.gray200}`,
  borderRadius: 6,
  fontSize: 15,
  fontFamily,
}

export default function Connexion() {
  const { role, login } = useAuth()
  const navigate = useNavigate()
  const from = useLocation().state?.from
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (role && !submitting) return <Navigate to={destinationFor(role, from)} replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const receivedRole = await login(username.trim(), password)
      navigate(destinationFor(receivedRole, from), { replace: true })
    } catch (err) {
      setError(
        err.status === 401
          ? 'Identifiant ou mot de passe incorrect.'
          : err.status
            ? err.message
            : 'Serveur injoignable. Vérifiez votre connexion et réessayez.',
      )
      setSubmitting(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.black,
        fontFamily,
        padding: 16,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 360,
          background: colors.white,
          borderRadius: 12,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 26, letterSpacing: 1, color: colors.black }}>
            SEN<span style={{ color: colors.red }}>YUMMIES</span>
          </h1>
          <p style={{ margin: '4px 0 0', color: colors.gray600 }}>Espace du personnel</p>
        </div>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
          Identifiant
          <input
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
            required
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
          Mot de passe
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && (
          <p role="alert" style={{ margin: 0, color: colors.red, fontSize: 14 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '12px',
            background: colors.red,
            color: colors.white,
            border: 'none',
            borderRadius: 6,
            fontSize: 15,
            fontWeight: 600,
            fontFamily,
            cursor: submitting ? 'wait' : 'pointer',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
