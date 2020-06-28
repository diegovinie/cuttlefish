export const initialState = {
  user: {

  },
  players: [],
  // standby | started | ended
  status: 'standby',
  matchid: null,
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

    case 'SET_STATUS':
      return {
        ...state,
        status: action.status
      }

    case 'SET_MATCH_ID':
      return {
        ...state,
        matchId: action.matchId
      }

    default:
      throw new Error(`Action ${action.type} not found.`)
  }
}
