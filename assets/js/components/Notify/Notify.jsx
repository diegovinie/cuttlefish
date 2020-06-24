import React, { createContext, useContext, useReducer } from 'react'
import Notification from './Notification.jsx'

const initialState = {
  title: '',
  body: '',
  noActions: false,
  dispayed: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FIRE':
      return {
        ...action.options,
        displayed: true
      }

    case 'RESET':
      return {
        ...initialState
      }

    default:
      throw new Error(`Action ${action.type} not found.`)
  }
}

const Context = createContext()

export const useNotify = () => {
  const [state, dispatch] = useContext(Context)

  const fire = options => {
    const { title, body } = options
    return dispatch({  type: 'FIRE', options })
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
    <Context.Provider value={useReducer(reducer, initialState)}>
      {children}
      <Context.Consumer>
        {
          ([state, dispatch]) => (
            <Notification {...state} dispatch={dispatch} />
          )
        }
      </Context.Consumer>
    </Context.Provider>
  )
}

export default Notify
