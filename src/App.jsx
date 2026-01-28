import { useState } from 'react'
import Nav from './Nav'
import Login from './pages/Login'
import AddItem from './pages/AddItem'
import Gallery from './pages/Gallery'

function App() {
  const [isLogged, setIsLogged] = useState(() => localStorage.getItem('isLogged') === 'true')
  const [page, setPage] = useState('gallery')
  const [items, setItems] = useState([])

  const handleAddItems = (newItems) => {
    setItems((prev) => [...newItems, ...prev])
  }

  if (!isLogged) return <Login setIsLogged={setIsLogged} />

  return (
    <>
      <Nav isLogged={isLogged} setIsLogged={setIsLogged} setPage={setPage} />
      <div className="container mt-4">
        {page === 'gallery' && <Gallery items={items} />}
        {page === 'add' && <AddItem onAdd={handleAddItems} />}
      </div>
    </>
  )
}

export default App
