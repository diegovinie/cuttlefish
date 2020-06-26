import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ws from '@/services/ws'
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
        if (!ws.socket) ws.connect({ username })
        const { presence } = ws.joinLobby()

        ws.onMsg(handleNewMsg)

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

  const connected = useMemo(() => ws.info.connected, [ws.info.connected])

  const handleInput = e => setInput(e.target.value)

  const handleKeyPress = e => {
    if (event.key === 'Enter') {
      ws.sendMsg(input)
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
