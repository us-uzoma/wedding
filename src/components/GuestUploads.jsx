import { useState } from 'react'
import { supabase } from './lib/supabase'

export default function GuestUploads() {
  const [file, setFile] = useState(null)
  const [guestName, setGuestName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleUpload(e) {
    e.preventDefault()

    if (!file) {
      setMessage('Please select a photo or video.')
      return
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/quicktime',
      'video/webm'
    ]

    if (!allowedTypes.includes(file.type)) {
      setMessage('Please select a supported image or video.')
      return
    }

    if (file.size > 50 * 1024 * 1024) {
      setMessage('The file must be 50 MB or smaller.')
      return
    }

    setLoading(true)
    setMessage('')

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filePath =
      `${Date.now()}-${crypto.randomUUID()}-${safeName}`

    const { error } = await supabase.storage
      .from('wedding-gallery')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      })

    setLoading(false)

    if (error) {
      setMessage('Upload failed. Please try again.')
      return
    }

    setMessage('Thank you for sharing your memories!')

    setFile(null)
    e.target.reset()
    setGuestName('')
  }

  return (
    <form onSubmit={handleUpload}>
      <h2>Share Your Wedding Memories</h2>

      <input
        placeholder="Your name"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />

      <button disabled={loading}>
        {loading ? 'Uploading...' : 'Share Memory'}
      </button>

      <p>{message}</p>
    </form>
  )
}