import React from 'react'
import Navbar from './components/Navbar.jsx'
import GameBoard from './components/GameBoard.jsx'
import CardDeck from './components/CardDeck.jsx'

const Main = () => {

  return (
    <div className="main">
      <Navbar />
      <GameBoard />
      <CardDeck />
    </div>
  )
}

export default Main
