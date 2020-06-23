import React, { useState, useEffect, useCallback } from 'react'
import './ChatBox.scss'
import { channel } from '../socket'

const ChatBox = () => {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const handleInput = e => setInput(e.target.value)

  const handleKeyPress = e => {
    if (event.key === 'Enter') {
      channel.push('new_msg', {body: input})
      setInput('')
    }
  }

  const handleNewMsg = useCallback(
    payload => setMessages(msgs => msgs.concat(payload.body)), []
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
            <li key={msg} className="chat-box-content-logs-message">
              {msg}
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
