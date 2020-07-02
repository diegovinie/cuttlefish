const getInitialState = () => ({
  user: {

  },
  players: [],
  // standby | started | ended
  status: 'disconnected',
  matchid: null,
  stats: {
    avg: null
  }
})

export const initialState = getInitialState()

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { ...action.user }
      }

    case 'RESET_USER':
      return getInitialState()

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

    case 'SET_STATS':
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.stats
        }
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
