import React from 'react'
import { useNotify } from '@/components/Notify'
import './Navbar.scss'
import { useContextValue } from '@/store'
import Login from '@/components/Login.jsx'

const Navbar = () => {
  const [{ user }, dispatch] = useContextValue()
  const { state: { displayed }, fire, reset } = useNotify()

  const handleLogin = () => {
    fire({
      title: 'Login',
      noActions: true,
      body: <Login onDone={reset} />
    })
  }

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
