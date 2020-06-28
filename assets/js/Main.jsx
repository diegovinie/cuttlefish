import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import GameBoard from './components/GameBoard'
import ChatBox from './components/ChatBox.jsx'
import CardDeck from './components/CardDeck.jsx'
import Notify from './components/Notify'
import { StoreProvider } from './store'
import './Main.scss'

const Main = () => {

  return (
    <StoreProvider>
      <Notify>
        <Router>
          <div className="main">
            <Navbar />
            <article className="main-content">
              <GameBoard />
              <ChatBox />
            </article>
            <CardDeck />
          </div>
        </Router>
      </Notify>
    </StoreProvider>
  )
}

export default Main
