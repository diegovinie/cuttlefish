import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { parseMsg } from '@/functions'
import { connectToLobby } from '@/api/socket'
import { useContextValue } from '@/store'
import './ChatBox.scss'

const ChatBox = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [{ user: { username } }, dispatch] = useContextValue()

  const handleNewMsg = useCallback(
    msg => setMessages(msgs => msgs.concat(msg)), []
  )

  // detects name changes and connect to socket lobby
  const { socket, channel, presence } = useMemo(
    () => {
      if (!username) return {}

      const conn = connectToLobby({ username })
      conn.channel.on('new_msg', handleNewMsg)

      conn.presence.onSync(() => {
        const users = []
        presence.list((username, payload) => {
          users.push(username)
        })

        setUsers(users)
      })

      return conn
    },
    [username]
  )

  const handleInput = e => setInput(e.target.value)

  const handleKeyPress = e => {
    if (event.key === 'Enter') {
      channel.push('new_msg', parseMsg({ username, body: input }))
      setInput('')
    }
  }

  return (
    <section className="chat-box">
      {!channel ? (
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
                {users.map(username => (
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
