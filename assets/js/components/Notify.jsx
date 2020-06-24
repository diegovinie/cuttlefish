import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
  title: 'dummy',
  body: 'something',
  dispayed: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FIRE':
      return {
        title: action.title,
        body: action.body,
        displayed: true
      }

    case 'RESET':
      return {
        title: 'dummy2',
        body: 'something2',
        dispayed: false
      }

    default:
      throw new Error(`Action ${action.type} not found.`)
  }
}

const Context = createContext()

const Provider = ({ children }) => (
  <Context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </Context.Provider>
)

export const useNotify = () => {
  const [state, dispatch] = useContext(Context)

  const fire = options => {
    const { title, body } = options
    console.log('fire!!', title, body);
    return dispatch({ type: 'FIRE', title, body })
  }

  const reset = options => {
    return dispatch({ type: 'RESET' })
  }

  return {
    state,
    fire,
    reset,
    // show,
    // hide
  }
}

const Notify = props => {
  const { children } = props

  return (
    <Provider>
      {children}
      <Context.Consumer>
        {
          ([state, dispatch]) => {
            const { title, body, displayed } = state

            return (
              <div className="notify" style={{  display: displayed ? 'block' : 'none' }}>
                <div className="notify-cover">
                  <div className="notify-content">
                    <div className="notify-content">{title}</div>
                    <div className="notify-content">{body}</div>
                  </div>
                </div>
              </div>
            )
          }
        }
      </Context.Consumer>
    </Provider>
  )
}

export default Notify
