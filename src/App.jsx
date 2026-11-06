import React from 'react'
import WeddingCard from './components/WeddingCard/WeddingCard'
import WeddingDetails from './components/WeddingDetails/WeddingDetails'
import WeddingRSVP from './components/WeddingRSVP/WeddingRSVP'
import RSVP from './components/RSVP'
import GuestUploads from './components/GuestUploads/GuestUploads'
import WeddingGallery from './components/WeddingGallery/WeddingGallery'



const App = () => {
  return (
    <div>
      <WeddingCard />
      <WeddingDetails />
      {/* <WeddingRSVP /> */}
      <RSVP />
      <WeddingGallery />
      <section id="guest-uploads">
        <GuestUploads />
      </section>


    </div>
  )
}

export default App
