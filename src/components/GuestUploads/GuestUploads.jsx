
import { useRef, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './GuestUploads.css'

export default function GuestUploads() {
  const [file, setFile] = useState(null)
  const [guestName, setGuestName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)

  const fileInputRef = useRef(null)
  const previewUrl = file ? URL.createObjectURL(file) : null

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function selectFile(selectedFile) {
    setMessage('')
    setError('')

    if (!selectedFile) return

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/quicktime',
      'video/webm'
    ]

    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please select a supported photo or video.')
      return
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('Your file must be 50 MB or smaller.')
      return
    }

    setFile(selectedFile)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    selectFile(e.dataTransfer.files?.[0])
  }

  async function handleUpload(e) {
    e.preventDefault()

    if (!file || guestName.trim().length < 2) {
      setError('Please enter your name and select a file.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')

    const filePath =
      `${Date.now()}-${crypto.randomUUID()}-${safeName}`

    // 1. Upload the actual file
    const { error: uploadError } = await supabase.storage
      .from('wedding-gallery')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      setLoading(false)
      setError('File upload failed. Please try again.')
      return
    }

    // 2. Save the guest name and file details
    const { error: recordError } = await supabase
      .from('wedding_memories')
      .insert([{
        uploader_name: guestName.trim(),
        file_path: filePath,
        media_type: file.type.startsWith('video/')
          ? 'video'
          : 'image'
      }])

    setLoading(false)

    if (recordError) {
      setError(
        'Your file uploaded, but its details could not be saved. Please contact the couple.'
      )
      return
    }

    // 3. Display success
    setMessage(
      `Thank you, ${guestName.trim()}! Your memory has been shared successfully.`
    )

    setFile(null)
    setGuestName('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <section className="guest-upload-section" id="guest-uploads">

      <div className="guest-upload-container">

        <div className="guest-upload-heading">
          <span className="guest-upload-overline">
            HELP US MAKE THESE MEMORIES LAST FOREVER
          </span>

          <h2>
            Your Moments,
            <br />
            <em>Our Forever Memories.</em>
          </h2>

          <div className="upload-divider">
            <span></span>
            <i>♥</i>
            <span></span>
          </div>

          <p>
            Did you capture a beautiful moment at our wedding?
            Share your photographs and videos with us so we can
            treasure every memory.
          </p>
        </div>

        <div className="guest-upload-card">

          <div className="upload-card-heading">
            <span className="upload-heart">♡</span>
            <h3>Share Your Memories</h3>
            <p>Every moment deserves to be remembered.</p>
          </div>

          <form onSubmit={handleUpload}>

            <div className="upload-field">
              <label>Your Name *</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="upload-field">
              <label>Choose Your Photo or Video *</label>

              <div
                className={`upload-dropzone ${
                  dragging ? 'dragging' : ''
                } ${file ? 'has-file' : ''}`}
                onDragOver={e => {
                  e.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    fileInputRef.current?.click()
                  }
                }}
              >

                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
                  onChange={e => selectFile(e.target.files?.[0])}
                />

                {!file ? (
                  <>
                    <div className="upload-icon">↑</div>
                    <h4>Drop your memories here</h4>
                    <p>
                      or <span>browse files</span> from your device
                    </p>
                    <small>
                      JPG, PNG, WEBP, MP4, MOV or WEBM · Maximum 50 MB
                    </small>
                  </>
                ) : (
                  <div className="upload-preview">

                    {file.type.startsWith('video/') ? (
                      <video
                        src={previewUrl}
                        controls
                        onClick={e => e.stopPropagation()}
                      />
                    ) : (
                      <img src={previewUrl} alt="Selected memory" />
                    )}

                    <div className="selected-file-info">
                      <strong>{file.name}</strong>
                      <span>
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>

                    <button
                      type="button"
                      className="remove-file"
                      onClick={e => {
                        e.stopPropagation()
                        setFile(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ''
                        }
                      }}
                    >
                      Remove file
                    </button>
                  </div>
                )}

              </div>
            </div>

            {message && (
              <div className="upload-success">
                ♥
                <p>{message}</p>
              </div>
            )}

            {error && (
              <div className="upload-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="upload-submit"
              disabled={loading}
            >
              {loading ? 'SHARING YOUR MEMORY...' : 'SHARE YOUR MEMORY'}
              <span>♡</span>
            </button>

          </form>

          <div className="upload-card-footer">
            MADE WITH LOVE · SHARED FOREVER
          </div>

        </div>

        <p className="upload-closing">
          Thank you for being part of our beautiful story.
        </p>

      </div>

    </section>
  )
}
