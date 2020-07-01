import React, { useState, useMemo, useEffect } from 'react'
import { useContextValue } from '@/store'
import playerApi from '@/api/players'
import { useNotify } from '@/components/Notify'
import Table from '@/components/Table.jsx'
import ws from '@/services/ws'

const GameBoardControls = props => {
  const {
    Status,
    handleJoin,
    handleGather,
    handleToggle,
    boardPlayers
  } = props

  return (
    <div className="game-board-controls">
      <div className="field">
        <label className="label">Match</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Match's name"
            />
        </div>
      </div>
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
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          {!Status.connected && (
            <button type="button" className="button is-primary" onClick={handleJoin}>
              join
            </button>
          )}

          {Status.connected &&  (
            <button type="button" className="button is-primary" onClick={handleGather}>
              Leave
            </button>
          )}
        </div>
        <div className="control">
          {Status.standby && (
            <button type="button" className="button is-info" onClick={handleToggle}>
              start
            </button>
          )}

          {Status.started && (
            <button type="button" className="button is-info" onClick={handleToggle}>
              end
            </button>
          )}

          {Status.ended && (
            <button type="button" className="button is-info" onClick={handleToggle}>
              restart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameBoardControls
