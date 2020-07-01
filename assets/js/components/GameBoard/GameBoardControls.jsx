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
    <div className={`game-board-controls ${Status.status}`}>
      <div className="game-board-controls-display">
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
        <div className="game-board-controls-participants field">
          <label className="label">Participants:</label>
            <div className="game-board-game-players control">
              {boardPlayers.map(player => (
                <div key={player.username} className="game-board-game-players-player">
                  <div>
                    {player.username}
                  </div>
                </div>
              ))}
            </div>
        </div>
        <hr />
      </div>
      <div className="game-board-controls-buttons field">
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
