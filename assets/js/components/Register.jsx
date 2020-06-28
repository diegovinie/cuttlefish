import React, { useState } from 'react'
import playerApi from '@/api/players'
import { useContextValue } from '@/store'

const Register = props => {
  const { username, onDone } = props

  const [question, setQuestion] = useState('')
  const [secret, setSecret] = useState('')
  const [{ user }, dispatch] = useContextValue()

  const setUser = user => dispatch({ type: 'SET_USER', user })

  const handleQuestionInput = e => {
    setQuestion(e.target.value)
  }

  const handleSecretInput = e => {
    setSecret(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    return playerApi.create({ username, question, secret })
      .then(({data}) => data)
      .then(setUser)
      .finally(onDone)
  }

  return (
    <form onSubmit={handleSubmit} className="register">
      <div className="register control">
        <div className="control mb-3">
          <input
            type="text"
            className="input"
            readOnly
            value={username}
          />
        </div>
        <div className="control mb-3">
          <input
            type="text"
            className="input"
            value={question}
            placeholder="This will asked if you set it"
            onChange={handleQuestionInput}
          />
        </div>
        <div className="control mb-3">
          <input
            type="password"
            className="input"
            placeholder="The answer for your question"
            value={secret}
            onChange={handleSecretInput}
          />
        </div>
      </div>
      <div className="register">
        <button className="button is-primary" type="submit">
          Send
        </button>
      </div>
    </form>
  )
}

Register.defaultProps = {
  onDone: e => e
}

export default Register
