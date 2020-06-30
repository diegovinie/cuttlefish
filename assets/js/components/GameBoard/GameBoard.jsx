import React, { useState, useMemo, useEffect } from 'react'
import { useContextValue } from '@/store'
import playerApi from '@/api/players'
import { useNotify } from '@/components/Notify'
import Table from '@/components/Table.jsx'
import GameBoardControls from './GameBoardControls.jsx'
import ws from '@/services/ws'
import './GameBoard.scss'

const GameBoard = () => {
  const [{ user, players, status, stats }, dispatch] = useContextValue()
  const [boardPlayers, setBoardPlayers] = useState([])

  const setStatus = status => dispatch({ type: 'SET_STATUS', status })

  const updateBoardPlayer = player => {
    const replacePlayer = ps => ps.map(p => p.username === player.username ? player : p)
    setBoardPlayers(replacePlayer)
  }

  const resetBoardPlayers = () => {
    const cleanValues = ps => ps.map(p => ({ username: p.username, value: null }))
    setBoardPlayers(cleanValues)
  }

  const { state: { displayed }, fire, reset } = useNotify()

  const connected = useMemo(() => ws.info.connected, [ws.info.connected])

  const handleGameStarted = msg => {
    console.log(msg)
    dispatch({ type: 'SET_MATCH_ID', matchId: msg.match_id })
    setStatus('started')
  }

  const handleGameRestarted = msg => {
    setStatus('standby')
    dispatch({type: 'SET_STATS', stats: { avg: null } })
    resetBoardPlayers()
  }

  const handleGameEnded = msg => {
    setStatus('ended')
    dispatch({type: 'SET_STATS', stats: { avg: msg.avg } })
  }

  const handleGameLeft = msg => {
    dispatch({ type: 'SET_PLAYERS', players: [] })
  }

  const handleJoin = e => {
    const { presence } = ws.joinGame()

    presence.onSync(() => {
      const players = []
      presence.list((username, payload) => {
        players.push({ username, value: null })
      })

      ws.onCardPicked(updateBoardPlayer)
      ws.onStarted(handleGameStarted)
      ws.onRestarted(handleGameRestarted)
      ws.onEnded(handleGameEnded)
      ws.onLeave(handleGameLeft)

      setBoardPlayers(players)
    })
  }

  const handleToggle = status === 'standby' ? ws.startGame : ws.restartGame

  const handleGather = () => {
    setStatus('standby')
  }

  useEffect(
    () => {
      const completed = boardPlayers.length && boardPlayers.every(({value}) => value)

      if (completed) {
        ws.endGame()
        // fire({
        //   title: 'All done!'
        // })
      }

    },
    [boardPlayers]
  )

  return (
    <div className="game-board">
      <div className="game-board-controls-container">
        <GameBoardControls
          connected={connected}
          handleJoin={handleJoin}
          handleGather={ws.leaveGame}
          handleToggle={handleToggle}
          boardPlayers={boardPlayers}
        />
      </div>
      <Table
        players={boardPlayers}
        status={status}
        stats={stats}
        onStart={handleToggle}
        />

      <div className="game-board-game">

      </div>
    </div>
  )
}

export default GameBoard
