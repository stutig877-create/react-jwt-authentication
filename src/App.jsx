import { useState } from 'react'
import './App.css'

const TOKEN_KEY = 'login-demo-token'
const DEMO_ACCOUNTS = [
  { username: 'admin', password: '1234', userId: 101, role: 'admin' },
  { username: 'editor', password: 'edit123', userId: 102, role: 'editor' },
  { username: 'viewer', password: 'view123', userId: 103, role: 'viewer' },
]

function readSavedSession() {
  const token = localStorage.getItem(TOKEN_KEY)

  if (!token) return null

  try {
    return { token, user: JSON.parse(atob(token)) }
  } catch {
    localStorage.removeItem(TOKEN_KEY)
    return null
  }
}

function App() {
  const [session, setSession] = useState(readSavedSession)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin(event) {
    event.preventDefault()

    const account = DEMO_ACCOUNTS.find(
      (demoAccount) => demoAccount.username === username && demoAccount.password === password,
    )

    if (!account) {
      setError('That username and password do not match.')
      return
    }

    const user = { userId: account.userId, role: account.role }
    const token = btoa(JSON.stringify(user))

    localStorage.setItem(TOKEN_KEY, token)
    setSession({ token, user })
    setError('')
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY)
    setSession(null)
    setUsername('')
    setPassword('')
  }

  return (
    <main className="app-shell">
      <aside className="brand-panel">
        <div className="brand-mark" aria-hidden="true">A</div>
        <div className="brand-copy">
          <p className="eyebrow">ACCESS PORTAL</p>
          <h1>Good to<br />see you.</h1>
          <p className="brand-caption">Your workspace, ready when you are.</p>
        </div>
        <p className="brand-footer">ACCOUNT SERVICES <span>01 / 01</span></p>
      </aside>

      <section className="content-panel">
        <div className="panel-topline">
          <span className="environment-label"><span className="status-dot" /> DEMO ENVIRONMENT</span>
          <span className="topline-index">AUTH / 01</span>
        </div>

        {session?.token ? (
          <section className="dashboard" aria-labelledby="dashboard-title">
            <div className="success-message" role="status">
              <span className="success-check" aria-hidden="true">&#10003;</span>
              <div>
                <strong>Login Successful</strong>
                <span>Signed in with the {session.user.role} role</span>
              </div>
            </div>

            <div className="dashboard-heading">
              <div>
                <p className="eyebrow">ACCOUNT OVERVIEW</p>
                <h2 id="dashboard-title">Dashboard</h2>
              </div>
              <button className="logout-button" type="button" onClick={handleLogout}>
                Log out <span aria-hidden="true">&#8599;</span>
              </button>
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">USER ID</span>
                <strong>{session.user.userId}</strong>
              </div>
              <div className="detail-item">
                <span className="detail-label">ROLE</span>
                <strong className="role-value"><span className="role-dot" />{session.user.role}</strong>
              </div>
            </div>

            <div className="token-panel">
              <div className="token-heading">
                <span className="detail-label">SIMULATED TOKEN</span>
                <span className="token-state"><span className="status-dot" /> STORED</span>
              </div>
              <code>{session.token}</code>
            </div>
          </section>
        ) : (
          <section className="login-view" aria-labelledby="login-title">
            <div className="login-heading">
              <p className="eyebrow">MEMBER SIGN IN</p>
              <h2 id="login-title">Sign in to continue</h2>
              <p>Enter your account details below.</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              {error && <p className="error-message" role="alert">{error}</p>}

              <button className="login-button" type="submit">
                Log in <span aria-hidden="true">&#8594;</span>
              </button>
            </form>

            <div className="demo-credentials" aria-label="Demo accounts">
              <p className="demo-credentials-label">DEMO ACCOUNTS</p>
              {DEMO_ACCOUNTS.map((account) => (
                <p className="demo-account" key={account.username}>
                  <strong>{account.username}</strong>
                  <span>/</span>
                  <span className="demo-password">{account.password}</span>
                </p>
              ))}
            </div>
          </section>
        )}

        <footer className="content-footer">
          <span>AUTHENTICATION DEMO</span>
          <span>REACT <i /> LOCAL SESSION</span>
        </footer>
      </section>
    </main>
  )
}

export default App
