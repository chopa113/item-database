import { useState } from 'react'

function AddItem({ onAdd }) {
  const [title, setTitle] = useState('')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!title || files.length === 0) return setMessage('Tytuł i zdjęcia wymagane')

    setLoading(true)
    setMessage('')

    try {
      const formData = new FormData()
      files.forEach((file) => formData.append('file', file))

      const res = await fetch('/api/upload', { method: 'POST', body: formData })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Błąd uploadu')

      const newItems = data.uploaded.map((url) => ({ title, image_url: url }))
      onAdd(newItems)

      setMessage(`Dodano ${files.length} zdjęcia/zdjęć!`)
      setTitle('')
      setFiles([])
    } catch (err) {
      console.error(err)
      setMessage('Błąd uploadu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="card p-3" style={{ width: '22rem' }} onSubmit={handleUpload}>
      <h5 className="mb-3">Dodaj zdjęcia</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Tytuł"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        className="form-control mb-2"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      <button className="btn btn-success w-100" disabled={loading}>
        {loading ? 'Wysyłanie...' : 'Dodaj'}
      </button>
      {message && <div className="alert alert-info mt-2">{message}</div>}
    </form>
  )
}

export default AddItem
