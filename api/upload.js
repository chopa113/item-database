import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = { api: { bodyParser: false } }

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')

  const form = new IncomingForm()
  form.uploadDir = path.join(process.cwd(), '/public/uploads')
  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message })

    const uploaded = []
    const filesArray = Array.isArray(files.file) ? files.file : [files.file]
    for (const f of filesArray) {
      const newPath = path.join(form.uploadDir, f.originalFilename)
      fs.renameSync(f.filepath, newPath)
      uploaded.push(`/uploads/${f.originalFilename}`)
    }

    res.json({ uploaded })
  })
}
