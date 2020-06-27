import React , {useState} from 'react'
import { useContextValue } from '@/store'
import Register from './Register.jsx'
import playerApi from '@/api/players'

const Login = props => {
  const { onDone } = props

  const [username, setUsername] = useState('')
  const [register, setRegister] = useState(false)
  const [{ user, players }, dispatch] = useContextValue()

  const handleInput = e => {
    setUsername(e.target.value)
  }

  const setUser = user => dispatch({ type: 'SET_USER', user })

  const showRegister = () => {
    setRegister(true)
  }

  const handleSubmit = e => {
    e.preventDefault()

    return playerApi.lookUp(username)
      .then(({data}) => data)
      .then(user => user || Promise.reject(user))
      .then(setUser)
      .then(onDone)
      .catch(showRegister)
  }

  return (
    <section className="login section">
      {register ? (
        <Register username={username} onDone={onDone} />
      ) : (
        <form onSubmit={handleSubmit} className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={handleInput}
            />
          </div>
          <div className="control">
            <button type="submit" className="button is-primary">
              Search
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

Login.defaultProps = {
  onDone: e => e
}

export default Login
