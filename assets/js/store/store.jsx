import React, {createContext, useContext, useReducer} from 'react'
import {initialState, reducer} from './state'

const StateContext = createContext()

export const StateProvider = ({reducer, initialState, children}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useContextValue = () => useContext(StateContext)

export const StoreProvider = ({children}) => (
  <StateProvider initialState={initialState} reducer={reducer}>
    { children }
  </StateProvider>
)
