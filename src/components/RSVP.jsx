
import { useState } from 'react'
import { supabase } from './lib/supabase'
import './RSVP.css'

export default function RSVP() {
  const [form, setForm] = useState({
    guest_name: '',
    email: '',
    attending: 'yes',
    guest_count: 1,
    dietary_requirements: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    const { error } = await supabase
      .from('wedding_rsvps')
      .insert([{
        ...form,
        attending: form.attending === 'yes',
        guest_count: Number(form.guest_count)
      }])

    setLoading(false)

    if (error) {
      setError('Something went wrong. Please try again.')
      return
    }

    setSuccess('Your response has been received. We cannot wait to celebrate with you!')

    setForm({
      guest_name: '',
      email: '',
      attending: 'yes',
      guest_count: 1,
      dietary_requirements: '',
      message: ''
    })
  }

  return (
    <section className="rsvp-section" id="rsvp">
      <div className="rsvp-container">

        <div className="rsvp-heading">
          <span className="rsvp-overline">
            WE WOULD LOVE TO CELEBRATE WITH YOU
          </span>

          <h2>Kindly RSVP</h2>

          <div className="rsvp-divider">
            <span></span>
            <i>♥</i>
            <span></span>
          </div>

          <p>
            Your presence would make our special day even
            more beautiful. Kindly let us know if you will
            be joining us.
          </p>
        </div>

        <div className="rsvp-card">

          <div className="rsvp-card-top">
            <span>THE WEDDING CELEBRATION</span>
            <h3>Save Your Seat</h3>
            <p>Please respond using the form below.</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="rsvp-field">
              <label>Full Name *</label>
              <input
                name="guest_name"
                type="text"
                placeholder="Enter your full name"
                value={form.guest_name}
                onChange={handleChange}
                minLength={2}
                maxLength={100}
                required
              />
            </div>

            <div className="rsvp-field">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="rsvp-field">
              <label>Will you be attending? *</label>

              <div className="rsvp-attendance">
                <label className={`attendance-option ${
                  form.attending === 'yes' ? 'selected' : ''
                }`}>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={form.attending === 'yes'}
                    onChange={handleChange}
                  />
                  <span>Joyfully accepts</span>
                </label>

                <label className={`attendance-option ${
                  form.attending === 'no' ? 'selected' : ''
                }`}>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={form.attending === 'no'}
                    onChange={handleChange}
                  />
                  <span>Regretfully declines</span>
                </label>
              </div>
            </div>

            {form.attending === 'yes' && (
              <div className="rsvp-field">
                <label>Number of Guests *</label>
                <select
                  name="guest_count"
                  value={form.guest_count}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
                    <option key={number} value={number}>
                      {number} {number === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {form.attending === 'yes' && (
              <div className="rsvp-field">
                <label>Dietary Requirements</label>
                <input
                  name="dietary_requirements"
                  placeholder="Any special dietary needs?"
                  value={form.dietary_requirements}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="rsvp-field">
              <label>A Message for the Couple</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Leave us a lovely message..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {success && (
              <div className="rsvp-success">{success}</div>
            )}

            {error && (
              <div className="rsvp-error">{error}</div>
            )}

            <button
              type="submit"
              className="rsvp-submit"
              disabled={loading}
            >
              {loading ? 'SENDING...' : 'CONFIRM ATTENDANCE'}
              <span>♥</span>
            </button>

          </form>

          <div className="rsvp-card-footer">
            WITH LOVE & GRATITUDE
          </div>

        </div>

        <p className="rsvp-closing">
          We look forward to celebrating with you!
        </p>

      </div>
    </section>
  )
}
