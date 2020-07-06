import React, { useCallback, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useNotify } from '@/components/Notify'
import playerApi from '@/api/players'
import { useContextValue } from '@/store'
import { removeUrlParam } from '@/functions'
import Login from '@/components/Login.jsx'
import ws from '@/services/ws'
import './Navbar.scss'

const Navbar = () => {
  const [{ user }, dispatch] = useContextValue()
  const { state: { displayed }, fire, reset } = useNotify()

  const location = useLocation()
  const history = useHistory()

  const setUser = user => dispatch({ type: 'SET_USER', user })

  const checkUsername = useCallback(
    () => {
      const params = new URLSearchParams(location.search)
      const username = params.get('username')

      if (!username) return handleLogout()

      return playerApi.lookUp(username)
        .then(({data}) => data)
        .then(user => user || Promise.reject(user))
        .then(setUser)
        .catch(handleLogout)

    },
    [location.search]
  )

  const handleLogin = () => {
    fire({
      title: 'Login',
      noActions: true,
      body: <Login onDone={reset} />
    })
  }

  const handleLogout = () => {
    dispatch({ type: 'RESET_USER' })

    if (ws.info.connected) ws.disconnect()

    const search = removeUrlParam(location.search)('username')
    history.push(search)

    return true
  }

  useEffect(
    () => {
      checkUsername()
    },
    [checkUsername]
  )

  return (
    <div className="navbar">
      <div className="navbar-content">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                Pending
              </p>
            </div>
          </div>

          <div className="level-right">
            <p className="level-item">
              <a href="/admin/matches">Stats</a>
            </p>
            <p className="level-item">
              <a>About</a>
            </p>
            <p className="level-item">
              {user.username ? (
                <button onClick={handleLogout} className="button is-primary">
                  {user.username}
                </button>
              ) : (
                <button onClick={handleLogin} className="button is-primary">
                  Login
                </button>
              )}
            </p>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
