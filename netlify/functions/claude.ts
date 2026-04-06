import type { Handler } from '@netlify/functions'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const projectId = process.env.GCP_PROJECT_ID
  const apiKey = process.env.GCP_ACCESS_TOKEN

  if (!projectId || !apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GCP credentials not configured' }) }
  }

  let body: { messages: unknown[] }
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const systemPrompt = `Tu es "Le Professeur", un professeur de guitare acoustique expert et bienveillant.
Ton élève s'appelle Mathias, basé à Tahiti. Il joue déjà bien — Never Going Back Again, Blackbird, Jeux Interdits, Goldman. Il utilise une Boss RC-5. Il apprend par instinct et feeling.
Réponds toujours en français. Sois pratique, visuel, accessible comme Paul Davis. Maximum 300 mots sauf si nécessaire. Donne des exemples concrets avec des chansons connues.`

  try {
    const url = `https://us-east5-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-east5/publishers/anthropic/models/claude-sonnet-4-6@20250514:rawPredict?key=${apiKey}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        anthropic_version: 'vertex-2023-10-16',
        max_tokens: 1024,
        system: systemPrompt,
        messages: body.messages,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return { statusCode: response.status, body: JSON.stringify({ error: err }) }
    }

    const data = await response.json()
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: String(err) }) }
  }
}