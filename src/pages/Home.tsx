import { useEffect } from 'react'
import useStore from '../store/useStore'

function Home() {
  const message = useStore(state => state.message)
  const setMessage = useStore(state => state.setMessage)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/hello`)
      .then(res => res.json())
      .then(data => setMessage(data.message || 'No message'))
      .catch(() => setMessage('Failed to fetch from backend'))
  }, [setMessage])

  return (
    <div>
      <h1>🏠 Home</h1>
      <p>Backend says: <strong>{message}</strong></p>
    </div>
  )
}

export default Home
