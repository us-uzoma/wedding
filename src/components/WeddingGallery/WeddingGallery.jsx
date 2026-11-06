
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import './WeddingGallery.css'

export default function WeddingGallery() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadGallery() {
    setLoading(true)
    setError('')

    const { data, error } = await supabase.storage
      .from('wedding-gallery')
      .list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      setError('We could not load the wedding memories. Please try again.')
      setFiles([])
    } else {
      setFiles(
        (data || [])
          .filter(file => file.name && !file.name.startsWith('.'))
          .map(file => {
            const { data: publicData } = supabase.storage
              .from('wedding-gallery')
              .getPublicUrl(file.name)

            return {
              ...file,
              url: publicData.publicUrl,
              isVideo: /\.(mp4|mov|webm)$/i.test(file.name)
            }
          })
      )
    }

    setLoading(false)
  }

  useEffect(() => {
    loadGallery()
  }, [])

  return (
    <section className="wedding-gallery-section" id="gallery">

      <div className="gallery-container">

        {/* HEADING */}

        <div className="gallery-heading">

          <span className="gallery-overline">
            THE BEAUTY OF OUR SPECIAL DAY
          </span>

          <h2>
            Captured Moments,
            <br />
            <em>Forever Memories.</em>
          </h2>

          <div className="gallery-divider">
            <span></span>
            <i>♥</i>
            <span></span>
          </div>

          <p>
            Every picture tells a story, every smile holds
            a memory. Browse the beautiful moments from
            our celebration.
          </p>

        </div>

        {/* GALLERY */}

        {loading ? (

          <div className="gallery-status">
            <div className="gallery-spinner"></div>
            <p>Gathering beautiful memories...</p>
          </div>

        ) : error ? (

          <div className="gallery-status">
            <p>{error}</p>
            <button onClick={loadGallery}>Try again</button>
          </div>

        ) : files.length === 0 ? (

          <div className="gallery-empty">
            <span>♡</span>
            <h3>Our memories are waiting</h3>
            <p>
              Be among the first to share a special
              moment from our wedding celebration.
            </p>
          </div>

        ) : (

          <div className="wedding-gallery-grid">

            {files.map((file, index) => (

              <div
                className="gallery-item"
                key={file.name}
                style={{ '--item-index': index }}
              >

                {file.isVideo ? (

                  <video
                    src={file.url}
                    controls
                    preload="metadata"
                    playsInline
                  />

                ) : (

                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="gallery-image-link"
                  >
                    <img
                      src={file.url}
                      alt="Wedding celebration memory"
                      loading="lazy"
                    />

                    <div className="gallery-image-overlay">
                      <span>♡</span>
                    </div>
                  </a>

                )}

                <div className="gallery-item-caption">
                  <span>MEMORY NO. {index + 1}</span>
                  <span>♥</span>
                </div>

              </div>

            ))}

          </div>

        )}

        {/* GUEST INVITATION */}

        <div className="gallery-invitation">

          <div className="gallery-invitation-icon">♡</div>

          <h3>Were You Part of Our Day?</h3>

          <p>
            We would love to see the celebration through
            your eyes. Share your pictures and videos
            and help us keep these beautiful memories alive.
          </p>

          <a href="#guest-uploads" className="gallery-upload-link">
            SHARE YOUR MEMORIES <span>♥</span>
          </a>

        </div>

      </div>

    </section>
  )
}
