import React, { useState } from 'react'
import { useContextValue } from '@/store'
import playerApi from '@/api/players'
import { useNotify } from '@/components/Notify'
import Register from './Register.jsx'
import './GameBoard.scss'

const GameBoard = () => {
  const [username, setUsername] = useState('')
  const [{ user }, dispatch] = useContextValue()

  const setUser = user => dispatch({ type: 'SET_USER', user })

  const { state: { displayed }, fire, reset } = useNotify()

  const handleToggle = () => displayed
    ? reset()
    : fireRegistration()

  const fireRegistration = () => fire({
    title: 'Welcome!',
    noActions: true,
    body: <Register username={username} onDone={reset} />
  })

  const handleInput = e => {
    setUsername(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    playerApi.lookUp(username)
      .then(({data}) => data)
      .then(user => user || Promise.reject(user))
      .then(setUser)
      .catch(fireRegistration)
  }

  return (
    <div className="game-board">
      <div className="game-board-content">board {user.username}</div>
      <form onSubmit={handleSubmit} className="game-board-content">
        <input value={username} onChange={handleInput} />
        <button type="submit">
          send
        </button>
      </form>
    </div>
  )
}

export default GameBoard
