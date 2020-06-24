import React, { useState } from 'react'
import playerApi from '@/api/players'
import { useContextValue } from '@/store'

const Register = props => {
  const { nickname, onDone } = props

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

    return playerApi.create({ nickname, question, secret })
      .then(({data}) => data)
      .then(setUser)
      .finally(onDone)
  }

  return (
    <form onSubmit={handleSubmit} className="register">
      <div className="register">
        <input
          type="text"
          readOnly
          value={nickname}
        />
        <input
          type="text"
          value={question}
          placeholder="This will asked if you set it"
          onChange={handleQuestionInput}
        />
        <input
          type="password"
          placeholder="The answer for your question"
          value={secret}
          onChange={handleSecretInput}
        />
      </div>
      <div className="register">
        <button type="submit">Send</button>
      </div>
    </form>
  )
}

Register.defaultProps = {
  onDone: e => e
}

export default Register
