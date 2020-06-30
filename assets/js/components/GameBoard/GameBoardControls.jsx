import React, { useState, useMemo, useEffect } from 'react'
import { useContextValue } from '@/store'
import playerApi from '@/api/players'
import { useNotify } from '@/components/Notify'
import Table from '@/components/Table.jsx'
import ws from '@/services/ws'

const GameBoardControls = props => {
  const {
    connected,
    handleJoin,
    handleGather,
    handleToggle,
    boardPlayers
  } = props

  return (
    <div className="game-board-controls">
      {connected && (
        <button type="button" className="button is-primary" onClick={handleJoin}>
          join
        </button>
      )}

      {status === 'standby' && (
        <button type="button" className="button is-primary" onClick={handleToggle}>
          start
        </button>
      )}

      {true && (
        <button type="button" className="button is-primary" onClick={handleGather}>
          back
        </button>
      )}

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
  )
}

export default GameBoardControls
