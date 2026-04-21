import OpenAI from 'openai'

const MODEL = process.env.MEMORA_OPENAI_MODEL || 'gpt-5-nano'

const emotionValues = [
  'Feliz',
  'Nostalgico',
  'Importante',
  'En paz',
  'Inspirado',
  'Agradecido',
]

let client = null

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY')
  }

  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  return client
}

export async function assistMemory({ title, description }) {
  const openai = getClient()

  const response = await openai.responses.create({
    model: MODEL,
    input: [
      {
        role: 'developer',
        content:
          'Analiza recuerdos personales. Responde en JSON valido, breve y util. Si el texto ya es corto, el resumen debe conservar el tono. Si no hay suficiente contexto para inferir algo, haz la mejor inferencia razonable sin inventar hechos concretos.',
      },
      {
        role: 'user',
        content: `Titulo actual: ${title?.trim() || '(vacío)'}\n\nRecuerdo:\n${description}`,
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'memory_assistance',
        strict: true,
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            summary: {
              type: 'string',
              description:
                'Version resumida en 1 o 2 frases del recuerdo, manteniendo el tono personal.',
            },
            suggestedTitle: {
              type: 'string',
              description:
                'Titulo breve, evocador y concreto, de entre 2 y 6 palabras.',
            },
            detectedEmotion: {
              type: 'string',
              enum: emotionValues,
            },
          },
          required: ['summary', 'suggestedTitle', 'detectedEmotion'],
        },
      },
    },
  })

  if (!response.output_text) {
    throw new Error('OpenAI returned an empty response')
  }

  return JSON.parse(response.output_text)
}
