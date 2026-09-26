import { useAuth } from '../auth/AuthContext.jsx'
import { ROLE_LABELS } from '../auth/roles.js'
import { colors, fontFamily } from '../theme.js'

export default function Layout({ children }) {
  const { role, logout } = useAuth()

  return (
    <div style={{ minHeight: '100vh', background: colors.gray100, fontFamily, color: colors.black }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          background: colors.black,
          color: colors.white,
        }}
      >
        <strong style={{ letterSpacing: 1 }}>
          SEN<span style={{ color: colors.red }}>YUMMIES</span> Manager
        </strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: colors.gray400 }}>{ROLE_LABELS[role]}</span>
          <button
            type="button"
            onClick={logout}
            style={{
              background: 'transparent',
              color: colors.white,
              border: `1px solid ${colors.gray600}`,
              borderRadius: 6,
              padding: '6px 12px',
              cursor: 'pointer',
              fontFamily,
            }}
          >
            Déconnexion
          </button>
        </div>
      </header>
      <main style={{ padding: 24 }}>{children}</main>
    </div>
  )
}
