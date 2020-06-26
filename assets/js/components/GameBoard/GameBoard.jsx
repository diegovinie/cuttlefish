import React, { useState, useMemo, useEffect } from 'react'
import { useContextValue } from '@/store'
import playerApi from '@/api/players'
import { useNotify } from '@/components/Notify'
import ws from '@/services/ws'
import Register from './Register.jsx'
import './GameBoard.scss'

const GameBoard = () => {
  const [username, setUsername] = useState('')
  const [{ user, players }, dispatch] = useContextValue()
  const [boardPlayers, setBoardPlayers] = useState([])

  const updateBoardPlayer = player => {
    const ps = boardPlayers.map(p => p.username === player.username ? player : p)
    setBoardPlayers(ps)
  }

  const setUser = user => dispatch({ type: 'SET_USER', user })

  const { state: { displayed }, fire, reset } = useNotify()

  const connected = useMemo(() => ws.info.connected, [ws.info.connected])

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

  const handleJoin = e => {
    const { presence } = ws.joinGame()
    console.log('43');
    presence.onSync(() => {
      const players = []
      presence.list((username, payload) => {
        players.push({ username, value: null })
      })

      console.log(players)

      setBoardPlayers(players)
    })
  }

  // useEffect(
  //   () => {
  //     console.log('rerer', game.info.inGame);
  //     if (game.info.inGame) {
  //       game.rooms.game.presence.onSync(() => {
  //         const players = []
  //         game.rooms.game.presence.list((username, payload) => {
  //           players.push({ username, value: null })
  //         })
  //
  //         console.log(players)
  //
  //         setBoardPlayers(players)
  //       })
  //     }
  //   },
  //   [game.info.inGame]
  // )

  return (
    <div className="game-board">
      <div className="game-board-content">board {user.username}</div>
      <form onSubmit={handleSubmit} className="game-board-content">
        <input value={username} onChange={handleInput} />
        <button type="submit">
          send
        </button>
      </form>
      {connected && (
        <button type="button" onClick={handleJoin}>
          join
        </button>
      )}
      <div className="game-board-game">
        <div className="game-board-game-title">Game</div>
        <div className="game-board-game-players">
          {boardPlayers.map(player => (
            <div key={player.username} className="game-board-game-players-player">
              <div>
                {player.username}
              </div>
              <div>
                {player.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameBoard
