import React, { useState } from 'react'
import { fetchResponseFromBulut } from './api';
import './App.css'

const models = ['GPT-3.5 Turbo', 'GPT-4', 'Gemini Pro']
const voices = ['Sarah', 'Adam', 'Rachel']

function App() {
  const [model, setModel] = useState(models[0])
  const [voice, setVoice] = useState(voices[0])
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // CRA ile env değişkenleri REACT_APP_ ile başlar
  // Bu yüzden api.js'de de buna göre değişiklik yapmalısın (sonra ona da bakarız)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // API çağrısı burada olacak, aşağıdaki fonksiyon api.js'den gelecek
      const aiResponseText = await fetchResponseFromBulut(input, model, voice)
      const aiMessage = { sender: 'ai', text: aiResponseText }
      setMessages(prev => [...prev, aiMessage])
    } catch (err) {
      const errorMessage = { sender: 'ai', text: 'API Hatası: ' + err.message }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="top-bar">
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          {models.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={voice} onChange={(e) => setVoice(e.target.value)}>
          {voices.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <button onClick={() => setMessages([])} disabled={loading}>
          Yeni Sohbet
        </button>
      </div>

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === 'user' ? 'user' : 'ai'}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="ai loading">Yazıyor...</div>}
      </div>

      <div className="input-bar">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !loading && handleSend()}
          disabled={loading}
          placeholder="Mesajınızı yazın..."
        />
        <button onClick={handleSend} disabled={loading || !input.trim()}>
          Gönder
        </button>
      </div>
    </div>
  )
}

export default App
