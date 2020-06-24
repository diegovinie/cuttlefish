import React, { useState } from 'react'
import { useContextValue } from '@/store'
import playerApi from '@/api/players'
import { useNotify } from '@/components/Notify'
import Register from './Register.jsx'
import './GameBoard.scss'

const GameBoard = () => {
  const [nickname, setNickname] = useState('')
  const [{ user }, dispatch] = useContextValue()

  const setUser = user => dispatch({ type: 'SET_USER', user })

  const { state: { displayed }, fire, reset } = useNotify()

  const handleToggle = () => displayed
    ? reset()
    : fireRegistration()

  const fireRegistration = () => fire({
    title: 'Welcome!',
    noActions: true,
    body: <Register nickname={nickname} onDone={reset} />
  })

  const handleInput = e => {
    setNickname(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    playerApi.lookUp(nickname)
      .then(({data}) => data)
      .then(user => user || Promise.reject(user))
      .then(setUser)
      .catch(fireRegistration)
  }

  return (
    <div className="game-board">
      <div className="game-board-content">board {user.nickname}</div>
      <form onSubmit={handleSubmit} className="game-board-content">
        <input value={nickname} onChange={handleInput} />
        <button type="submit">
          send
        </button>
      </form>
    </div>
  )
}

export default GameBoard
