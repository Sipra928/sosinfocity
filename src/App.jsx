import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import GlobePage from './components/GlobePage'
import SplitText from './components/SplitText/SplitText'
import HomePage from './pages/HomePage'
import MagicBento from './blocks/Components/MagicBento/MagicBento'
import InfoPage from './components/InfoPage'

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
      
      </Routes>
    </Router>
  )
}

export default App
