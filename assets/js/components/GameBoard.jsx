import React, { useState } from 'react'
import './GameBoard.scss'
import playerApi from '../api/players'
import { useContextValue } from '../store'
import { useNotify } from './Notify'

const GameBoard = () => {
  const [nickname, setNickname] = useState('')
  const [{ user }, dispatch] = useContextValue()

  const setUser = user => dispatch({ type: 'SET_USER', user })

  const { state: { displayed }, fire, reset } = useNotify()

  const handleToggle = () => displayed
    ? reset()
    : fire({ title: 'My title!', body: 'testing'})

  const handleInput = e => {
    setNickname(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    playerApi.lookUp(nickname)
      .then(({data}) => data)
      .then(user => user || Promise.reject(user))
      .then(setUser)
      .catch(() => playerApi.create({ nickname }))
      .then(({data}) => data)
      .then(setUser)
  }

  return (
    <div className="game-board">
      <div className="game-board-content">board {user.nickname}</div>
      <form onSubmit={handleSubmit} className="game-board-content">
        <input value={nickname} onChange={handleInput} />
        <button type="submit">
          send
        </button>
        <button type="button" onClick={handleToggle}>
          {displayed ? 'close': 'open'}
        </button>
      </form>
    </div>
  )
}

export default GameBoard
