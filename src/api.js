// api.js
// DOCS: https://api.bulutdevelops.com.tr/api-docs

// eslint-disable-next-line no-undef
const apiKey = typeof process !== 'undefined' && process.env && process.env.REACT_APP_BULUT_API_KEY ? process.env.REACT_APP_BULUT_API_KEY : '';

export async function fetchResponseFromBulut(prompt, model, voice) {
  try {
    const response = await fetch('https://api.bulutdevelops.com.tr/api/v1/claude-4-0-thinking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // CRA ile ortam değişkenleri REACT_APP_ ile başlar
        'X-API-Key': apiKey
      },
      body: JSON.stringify({
        prompt: `[Model: ${model}] [Voice: ${voice}]\n${prompt}`
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'API Hatası')
    }

    const data = await response.json()
    return data.response || 'Boş cevap döndü'
  } catch (err) {
    console.error('API Hatası:', err)
    throw err
  }
}
