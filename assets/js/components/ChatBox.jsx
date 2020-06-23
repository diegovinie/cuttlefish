import React, { useState, useEffect, useCallback } from 'react'
import './ChatBox.scss'
import { channel } from '../socket'
import { parseMsg } from '../functions'
import { useContextValue } from '../store'

const ChatBox = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [{ user: { nickname: username } }, dispatch] = useContextValue()

  const handleInput = e => setInput(e.target.value)

  const handleKeyPress = e => {
    if (event.key === 'Enter') {
      channel.push('new_msg', parseMsg({ username, body: input }))
      setInput('')
    }
  }

  const handleNewMsg = useCallback(
    msg => setMessages(msgs => msgs.concat(msg)), []
  )

  useEffect(
    () => {
      channel.on('new_msg', handleNewMsg)
    },
    [handleNewMsg]
  )

  return (
    <section className="chat-box">
      <div className="chat-box-content">
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
        <div className="chat-box-content-input-box">
          <input
            className="chat-box-content-input"
            value={input}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </section>
  )
}

export default ChatBox
