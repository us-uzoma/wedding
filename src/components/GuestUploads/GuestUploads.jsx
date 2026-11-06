
import { useRef, useState } from 'react'
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

  function handleFileChange(e) {
    selectFile(e.target.files?.[0])
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    selectFile(e.dataTransfer.files?.[0])
  }

  async function handleUpload(e) {
    e.preventDefault()

    if (!file || !guestName.trim()) {
      setError('Please enter your name and select a file.')
      return
    }

    setLoading(true)
    setMessage('')
    setError('')

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')

    const filePath =
      `${Date.now()}-${crypto.randomUUID()}-${safeName}`

    const { error: uploadError } = await supabase.storage
      .from('wedding-gallery')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      })

    setLoading(false)

    if (uploadError) {
      setError('Upload failed. Please check your connection and try again.')
      return
    }

    setMessage(
      `Thank you, ${guestName.trim()}! Your memory has been shared successfully.`
    )

    setFile(null)
    setGuestName('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const isVideo = file?.type.startsWith('video/')
  const previewUrl = file ? URL.createObjectURL(file) : null

  return (
    <section className="guest-upload-section" id="guest-uploads">

      <div className="guest-upload-container">

        {/* HEADING */}

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
            We would love to see it. Share your photographs and
            videos with us so we can treasure every memory.
          </p>

        </div>

        {/* UPLOAD CARD */}

        <div className="guest-upload-card">

          <div className="upload-card-heading">
            <span className="upload-heart">♡</span>
            <h3>Share Your Memories</h3>
            <p>Every moment deserves to be remembered.</p>
          </div>

          <form onSubmit={handleUpload}>

            {/* NAME */}

            <div className="upload-field">
              <label>Your Name *</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                maxLength={100}
              />
            </div>

            {/* FILE UPLOAD */}

            <div className="upload-field">
              <label>Choose Your Photo or Video *</label>

              <div
                className={`upload-dropzone ${dragging ? 'dragging' : ''} ${
                  file ? 'has-file' : ''
                }`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    fileInputRef.current?.click()
                  }
                }}
              >

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
                  onChange={handleFileChange}
                  hidden
                />

                {!file ? (

                  <>
                    <div className="upload-icon">
                      <span>↑</span>
                    </div>

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

                    {isVideo ? (
                      <video
                        src={previewUrl}
                        controls
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <img src={previewUrl} alt="Selected wedding memory" />
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
                      onClick={(e) => {
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

            {/* FEEDBACK */}

            {message && (
              <div className="upload-success">
                <span>♥</span>
                {message}
              </div>
            )}

            {error && (
              <div className="upload-error">
                {error}
              </div>
            )}

            {/* SUBMIT */}

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
