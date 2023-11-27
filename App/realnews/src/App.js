import React from 'react'
import Navbar from './components/navbar/Navbar'
import News from './components/news/News'
import UnverifiedNews from './components/unverifiedNews/unverifiedNews'

const App = () => {
  return (
    <>
      <Navbar/>
      <UnverifiedNews/>
    </>
  )
}

export default App