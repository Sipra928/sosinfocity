import React from 'react'
import GlobePage from '../components/GlobePage'
import fImage2 from '../assets/images/fImage2.avif'

const HomePage = () => {
  return (
    <>
      {/* Top Globe section */}
      <GlobePage />

      {/* Parallax Image section under GlobePage */}
      <div
        className="w-full h-screen bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: `url(${fImage2})` }}
      >
        {/* Optional overlay content */}
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            Welcome to the next section
          </h1>
        </div>
      </div>

      {/* More content below */}
      
    </>
  )
}

export default HomePage
