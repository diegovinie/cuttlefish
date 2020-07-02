import React, { useMemo, useCallback, useState } from 'react'
import './Table.scss'

const Table = props => {
  const { players, Status, stats, onStart } = props

  // standby | started | ended
  // const [status, setStatus] = useState('standby')

  const mappedPositions = useMemo(
    () => !players.length ? [] : players.map((player, index, ps) => ({
        ang: 360 / ps.length,
        pos: index * (360 / ps.length) - 90,
        player
      })
    ),
    [players]
  )

  const getPosition = (pos) => {
    return Status.ended
      ? `rotateZ(0deg) translateX(${90 + pos * 0.8}px)`
      : `rotateZ(${pos}deg)`
  }

  const toggleStatus = () => {
    // setStatus(st => st === 'standby' ? 'started'
    //   : st === 'started' ? 'ended'
    //     : 'standby'
    // )
  }

  const handleCardClick = () => {
    onStart()
  }

  return (
    <div className="d-table">
      <div onClick={toggleStatus} className={`d-table-content ${Status.status}`}>
        <div className="d-table-content-status">
          <b>{Status.status}</b>
           {stats.avg && <span> | avg: {stats.avg}</span>}
        </div>
        {mappedPositions.map(p => (
          <div
            key={p.pos + p.angle + p.player.username}
            className="d-table-content-player"
            onClick={handleCardClick}
            style={{ transform: getPosition(p.pos) }}
          >
            <div className="card">
              <div className="reverse">
                <span
                  className={`icon has-text-success-light fa ${p.player.value ? 'fa-check' : ''}`}
                />
              </div>
              <div className="value">
                <span>
                  {p.player.value}
                </span>
              </div>
            </div>
            <div style={{ transform: `rotateZ(-${p.pos}deg)` }} className="name">
              {p.player.username}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Table
