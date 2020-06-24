import React from 'react'
import Navbar from './components/Navbar.jsx'
import GameBoard from './components/GameBoard.jsx'
import ChatBox from './components/ChatBox.jsx'
import CardDeck from './components/CardDeck.jsx'
import Notify from './components/Notify.jsx'
import { StoreProvider } from './store'
import './Main.scss'

const Main = () => {

  return (
    <StoreProvider>
      <Notify>
        <div className="main">
          <Navbar />
          <article className="main-content">
            <GameBoard />
            <ChatBox />
          </article>
          <CardDeck />
        </div>
      </Notify>
    </StoreProvider>
  )
}

export default Main
