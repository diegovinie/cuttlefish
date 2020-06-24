export const initialState = {
  user: {

  },
  players: []
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { ...action.user }
      }

    case 'SET_PLAYERS':
      return {
        ...state,
        players: action.players
      }

    default:
      throw new Error(`Action ${action.type} not found.`)
  }
}
