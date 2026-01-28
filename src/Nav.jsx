function Nav({ isLogged, setIsLogged, setPage }) {
  if (!isLogged) return null

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">MyApp</span>
      <div className="d-flex">
        <button className="btn btn-outline-light btn-sm me-2" onClick={() => setPage('gallery')}>
          Galeria
        </button>
        <button className="btn btn-outline-light btn-sm me-2" onClick={() => setPage('add')}>
          Dodaj zdjęcie
        </button>
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => {
            setIsLogged(false)
            localStorage.removeItem('isLogged')
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Nav
