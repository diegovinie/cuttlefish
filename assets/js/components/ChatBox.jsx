import React, { useState, useEffect, useCallback, useMemo } from 'react'
import game from '@/services/game'
import { useContextValue } from '@/store'
import './ChatBox.scss'

const ChatBox = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [{ user: { username }, players }, dispatch] = useContextValue()

  const setPlayers = players => dispatch({ type: 'SET_PLAYERS', players })

  const handleNewMsg = useCallback(
    msg => setMessages(msgs => msgs.concat(msg)), []
  )

  useEffect(
    () => {
      if (username) {
        if (!game.socket) game.connect({ username })
        const { presence } = game.joinLobby()

        game.onMsg(handleNewMsg)

        presence.onSync(() => {
          const players = []
          presence.list((username, payload) => {
            players.push(username)
          })

          setPlayers(players)
        })
      }
    },
    [username]
  )

  const connected = useMemo(() => game.info.connected, [game.info.connected])

  const handleInput = e => setInput(e.target.value)

  const handleKeyPress = e => {
    if (event.key === 'Enter') {
      game.sendMsg(input)
      setInput('')
    }
  }

  return (
    <section className="chat-box">
      {!connected ? (
        <div className="chat-box-content">
          <div className="chat-box-content-offline-message">
            Not connected
          </div>
        </div>
      ) : (
        <div className="chat-box-content">
          <div className="chat-box-content-container">
            <ul className="chat-box-content-logs">
              {messages.map(msg => (
                <li key={msg.body} className="chat-box-content-logs-message">
                  <div className="username">
                    U: {msg.username}
                  </div>
                  <div className="time">
                    T: {msg.created_at}
                  </div>
                  <div className="body">
                    {msg.body}
                  </div>
                </li>
              ))}
            </ul>
            <div className="chat-box-content-users-container">
              <div>
                <b>Online:</b>
              </div>
              <ul className="chat-box-content-users">
                {players.map(username => (
                  <li key={username} className="chat-box-content-users-user">
                    {username}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="chat-box-content-input-box">
            <input
              className="chat-box-content-input"
              value={input}
              onChange={handleInput}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default ChatBox
