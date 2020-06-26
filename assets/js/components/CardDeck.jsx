import React, { useEffect, useState, useMemo } from 'react'
import cardSetsApi from '../api/cardSets'
import game from '@/services/game'
import { log } from '../api/functions'
import './CardDeck.scss'

const CardDeck = () => {
  const [cardSets, setCardSets] = useState([])
  const [selected, setSelected] = useState(0)

  const current = useMemo(
    () => cardSets.length > 0 ? cardSets[selected] : ({ }),
    [cardSets, selected]
  )

  const handlePickCard = card => e => {
    game.pickCard(card)
  }

  useEffect(
    () => {
      cardSetsApi.getAll()
        .then(res => res.data)
        .then(log)
        .then(setCardSets)
    },
    []
  )

  return (
    <div className="card-deck">
      <div className="card-deck-content">
        <div className="card-deck-content-title">
          {current.name}
        </div>
        <ul className="card-deck-content-list">
          {current.content?.map(card => (
            <li key={`card-${card}`} className="card-deck-content-list-card">
              <button type="button" onClick={handlePickCard(card)}>
                {card}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CardDeck
