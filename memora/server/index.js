import 'dotenv/config'
import express from 'express'
import { assistMemory } from './openai.js'

const app = express()
const port = Number(process.env.PORT || 8787)

app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
  })
})

app.post('/api/memory-assist', async (request, response) => {
  const title =
    typeof request.body?.title === 'string' ? request.body.title : ''
  const description =
    typeof request.body?.description === 'string' ? request.body.description : ''

  if (!description.trim()) {
    return response.status(400).json({
      error: 'La descripcion es obligatoria para usar OpenAI.',
    })
  }

  try {
    const result = await assistMemory({
      title,
      description: description.trim(),
    })

    return response.json(result)
  } catch (error) {
    const message =
      error instanceof Error && error.message === 'Missing OPENAI_API_KEY'
        ? 'Configura OPENAI_API_KEY para habilitar OpenAI en Memora.'
        : 'No se pudo completar la asistencia con OpenAI.'

    return response.status(500).json({
      error: message,
    })
  }
})

app.listen(port, () => {
  console.log(`Memora API listening on http://127.0.0.1:${port}`)
})
