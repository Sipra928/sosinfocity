import React from 'react'
import GlobePage from './components/GlobePage'
import SplitText from './components/SplitText/SplitText'
import HomePage from './pages/HomePage'
import MagicBento from './blocks/Components/MagicBento/MagicBento'
import InfoPage from './pages/InfoPage'

const App = () => {
  return (
    <>
    
    <HomePage/>
   

{/* <MagicBento
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/> */}
<InfoPage/>

    
    </>
  )
}

export default App