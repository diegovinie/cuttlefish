import React, { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNotify } from '@/components/Notify'
import playerApi from '@/api/players'
import { useContextValue } from '@/store'
import Login from '@/components/Login.jsx'
import './Navbar.scss'

const Navbar = () => {
  const [{ user }, dispatch] = useContextValue()
  const { state: { displayed }, fire, reset } = useNotify()

  const location = useLocation()

  const setUser = user => dispatch({ type: 'SET_USER', user })

  const checkUsername = useCallback(
    () => {
      const username = location.search.replace(/^.*username=(\w+)&?$/, '$1')

      if (!username) return

      return playerApi.lookUp(username)
        .then(({data}) => data)
        .then(user => user || Promise.reject(user))
        .then(setUser)

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

  useEffect(
    () => {
      checkUsername()
    }
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
              <a>About</a>
            </p>
            <p className="level-item">
              <button onClick={handleLogin} className="button is-primary">
                {user.username || 'Login'}
              </button>
            </p>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
