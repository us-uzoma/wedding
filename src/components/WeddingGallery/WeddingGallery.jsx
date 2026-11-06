
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import './WeddingGallery.css'

export default function WeddingGallery() {
  const [memories, setMemories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadGallery() {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('wedding_memories')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      setError('We could not load the wedding memories.')
      setMemories([])
    } else {
      const formattedMemories = data.map(memory => {
        const { data: publicData } = supabase.storage
          .from('wedding-gallery')
          .getPublicUrl(memory.file_path)

        return {
          ...memory,
          url: publicData.publicUrl
        }
      })

      setMemories(formattedMemories)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadGallery()
  }, [])

  return (
    <section className="wedding-gallery-section" id="gallery">

      <div className="gallery-container">

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

        ) : memories.length === 0 ? (

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

            {memories.map((memory, index) => (

              <div className="gallery-item" key={memory.id}>

                {memory.media_type === 'video' ? (
                  <video
                    src={memory.url}
                    controls
                    preload="metadata"
                    playsInline
                  />
                ) : (
                  <a
                    href={memory.url}
                    target="_blank"
                    rel="noreferrer"
                    className="gallery-image-link"
                  >
                    <img
                      src={memory.url}
                      alt={`Wedding memory shared by ${memory.uploader_name}`}
                      loading="lazy"
                    />

                    <div className="gallery-image-overlay">
                      <span>♡</span>
                    </div>
                  </a>
                )}

                <div className="gallery-item-caption">
                  <div>
                    <span>Shared by {memory.uploader_name}</span>
                    <strong>Shared by {memory.uploader_name}</strong>
                  </div>

                  <span>
                    {memory.media_type === 'video' ? 'VIDEO' : 'PHOTO'}
                  </span>
                </div>

              </div>

            ))}

          </div>
        )}

        <div className="gallery-invitation">
          <div className="gallery-invitation-icon">♡</div>

          <h3>Were You Part of Our Day?</h3>

          <p>
            We would love to see the celebration through
            your eyes. Share your pictures and videos
            and help us keep these beautiful memories alive.
          </p>

          <a href="#guest-uploads" className="gallery-upload-link">
            SHARE YOUR MEMORIES <span>↗</span>
          </a>
        </div>

      </div>

    </section>
  )
}
