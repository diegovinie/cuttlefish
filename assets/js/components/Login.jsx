import React , {useState} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useContextValue } from '@/store'
import playerApi from '@/api/players'
import { replaceUrlParam } from '@/functions'
import Register from './Register.jsx'

const Login = props => {
  const { onDone } = props

  const location = useLocation()
  const history = useHistory()
  // console.log(location)
  // console.log(history)

  const setAuthenticatedUser = ({ username }) => {
    const search = replaceUrlParam(location.search)('username', username)
    history.push(search)

    return true
  }

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
      .then(r => console.log(r) || r)
      .then(setAuthenticatedUser)
      .then(onDone)
      .catch(showRegister)
  }

  return (
    <section className="login section">
      {register ? (
        <Register
          username={username}
          setAuthenticatedUser={setAuthenticatedUser}
          onDone={onDone}
          />
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
