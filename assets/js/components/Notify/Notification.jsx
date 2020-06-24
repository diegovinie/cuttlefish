import React from 'react'
import './Notification.scss'

const Notification = props => {
  const [state, dispatch] = props
  const {
    title,
    body,
    displayed
  } = state

  return (
    <div className="notify" style={{  display: displayed ? 'block' : 'block' }}>
      <div className="notify-cover" />
        <div className="notify-container">
          <div className="notify-content">
            <div className="notify-content-title">{title}</div>
            <div className="notify-content-body">{body}</div>
            <div className="notify-content-actions">
              <button type="button" className="">

              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Notification
