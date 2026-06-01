/**
 * ScriptMind API Service
 * Connects to the FastAPI backend at http://127.0.0.1:8000
 *
 * The Vite dev proxy (vite.config.js) forwards /predict → http://127.0.0.1:8000/predict
 * so we use a relative path in development. For production, update BASE_URL.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

/**
 * Detect the author of a given text passage.
 *
 * @param {string} text - The paragraph / passage to analyse
 * @returns {Promise<{ author: string }>}
 * @throws {Error} with a user-friendly message on failure
 */
export async function detectAuthor(text) {
  let response

  try {
    response = await fetch(`${BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ text }),
    })
  } catch (networkError) {
    throw new Error(
      'Unable to reach the backend. Make sure your FastAPI server is running on http://127.0.0.1:8000'
    )
  }

  if (!response.ok) {
    let detail = `Server responded with status ${response.status}`
    try {
      const errBody = await response.json()
      if (errBody.detail) detail = errBody.detail
    } catch (_) {
      // ignore JSON parse error on error body
    }
    throw new Error(detail)
  }

  const data = await response.json()

  if (!data.author) {
    throw new Error('Unexpected response format from server — missing "author" field.')
  }

  return data
}
