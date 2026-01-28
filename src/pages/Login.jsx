import { useState } from 'react'

function Login({ setIsLogged }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const SECRET_PASS = import.meta.env.VITE_APP_PASSWORD || 'tajnehaslo'

  const login = (e) => {
    e.preventDefault()

    if (password === SECRET_PASS) {
      localStorage.setItem('isLogged', 'true')
      setIsLogged(true)
    } else {
      setError('Złe hasło')
    }
  }

  return (
    <form onSubmit={login} className="p-4 card mx-auto mt-5" style={{ width: '20rem' }}>
      <h5 className="mb-3 text-center">Logowanie</h5>
      <input
        type="password"
        className="form-control mb-2"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary w-100">Zaloguj</button>
    </form>
  )
}

export default Login
