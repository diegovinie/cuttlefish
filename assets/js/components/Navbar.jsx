import React from 'react'
import './Navbar.scss'

const Navbar = () => {

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
              <button className="button is-primary">
                Login
              </button>
            </p>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
