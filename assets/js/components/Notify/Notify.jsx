import React, { createContext, useContext, useReducer } from 'react'
import Notification from './Notification.jsx'

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
    <Context.Provider value={useReducer(reducer, initialState)}>
      {children}
      <Context.Consumer>
        {Notification}
      </Context.Consumer>
    </Context.Provider>
  )
}

export default Notify
