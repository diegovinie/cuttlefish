import React from 'react'
import './Notification.scss'

const Notification = props => {
  const {
    title,
    body,
    displayed,
    positiveLabel,
    negativeLabel,
    onPositive,
    onNegative,
    noActions,
    dispatch
  } = props

  const close = () => dispatch({ type: 'RESET' })

  const handlePositive = e => {
    close()
    return onPositive()
  }

  const handleNegative = e => {
    close()
    return onNegative()
  }

  return (
    <div className="notify" style={{  display: displayed ? 'block' : 'none' }}>
      <div className="notify-cover" onClick={close} />
        <div className="notify-container">
          <div className="notify-content">
            <div className="notify-content-title">{title}</div>
            <div className="notify-content-body">{body}</div>
            {!noActions && (
              <div className="notify-content-actions">
                <button
                  type="button"
                  className=""
                  onClick={handlePositive}
                >
                  {positiveLabel}
                </button>
                <button
                  type="button"
                  className=""
                  onClick={handleNegative}
                >
                  {negativeLabel}
                </button>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

Notification.defaultProps = {
  positiveLabel: 'Ok',
  negativeLabel: 'Cancel',
  onPositive: e => e,
  onNegative: e => e,
  noActions: false
}

export default Notification
