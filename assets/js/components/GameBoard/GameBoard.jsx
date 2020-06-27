import React, { useState, useMemo, useEffect } from 'react'
import { useContextValue } from '@/store'
import playerApi from '@/api/players'
import { useNotify } from '@/components/Notify'
import Table from '@/components/Table.jsx'
import ws from '@/services/ws'
import './GameBoard.scss'

const GameBoard = () => {
  const [{ user, players }, dispatch] = useContextValue()
  const [boardPlayers, setBoardPlayers] = useState([])

  const updateBoardPlayer = player => {
    const replacePlayer = ps => ps.map(p => p.username === player.username ? player : p)
    setBoardPlayers(replacePlayer)
  }

  const { state: { displayed }, fire, reset } = useNotify()

  const connected = useMemo(() => ws.info.connected, [ws.info.connected])

  const handleJoin = e => {
    const { presence } = ws.joinGame()

    presence.onSync(() => {
      const players = []
      presence.list((username, payload) => {
        players.push({ username, value: null })
      })

      ws.onCardPicked(updateBoardPlayer)
      setBoardPlayers(players)
    })
  }

  useEffect(
    () => {
      const completed = boardPlayers.length && boardPlayers.every(({value}) => value)

      if (completed) {
        fire({
          title: 'All done!'
        })
      }

    },
    [boardPlayers]
  )

  return (
    <div className="game-board">
      <Table players={['maria', 'pedro', 'jose', 'maria', 'pedro', 'jose']} />
      {connected && (
        <button type="button" className="button is-primary" onClick={handleJoin}>
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
