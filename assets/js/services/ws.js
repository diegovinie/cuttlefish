import {Socket, Presence} from 'phoenix'
import { parseMsg } from '@/functions'

let socket
const rooms = {}
const info = {
  connected: false,
  username: null,
  inGame: false,
  matchId: null,
}

const addJoinListeners = (name, chn) => chn.join()
    .receive('ok', resp => { console.log(`${name}: Joined successfully`, resp) })
    .receive('error', resp => { console.log(`${name}: Unable to join`, resp) })

const connect = ({ username }) => {
  socket = new Socket('/socket', { params: { username } })
  info.username = username

  socket.connect()

  info.connected = true

  return socket
}

const disconnect = () => {
  socket?.disconnect()
  info.connected = false
}

const joinLobby = () => {
  const channel = socket.channel('room:lobby', {})
  const presence = new Presence(channel)

  addJoinListeners('lobby', channel)

  rooms.lobby = { channel, presence }

  return { channel, presence }
}

const sendMsg = msg => {
  rooms.lobby?.channel?.push('new_msg', parseMsg({
    username: info.username, body: msg
  }))
}

const joinGame = () => {
  const channel = socket.channel('room:game', {})
  const presence = new Presence(channel)

  addJoinListeners('game', channel)

  rooms.game = { channel, presence }
  info.inGame = true

  window.ch = channel

  return { channel, presence }
}

const leaveGame = () => {
  rooms.game?.channel?.leave()

  delete rooms.game
}

const pickCard = (matchId, value) => {
  info.matchId = matchId

  rooms.game?.channel?.push('card_picked', {
    username: info.username,
    match_id: matchId,
    value
  })
}

const onMsg = callback => rooms.lobby?.channel?.on('new_msg', callback)

const onCardPicked = callback => rooms.game?.channel?.on('card_picked', callback)

const onLeave = callback => rooms.game?.channel?.on ('phx_close', callback)

const startGame = () => {
  rooms.game?.channel?.push('game_started', {
    username: info.username,
    cardset_id: 1
  })
}

const restartGame = () => {
  rooms.game?.channel?.push('game_restarted', {
    username: info.username
  })
}

const endGame = ({ name }) => {
  rooms.game?.channel?.push('game_ended', {
    username: info.username,
    match_id: info.matchId,
    name
  })
}

const onRestarted = callback => rooms.game?.channel?.on('game_restarted', callback)

const onStarted = callback => rooms.game?.channel?.on('game_started', callback)

const onEnded = callback => rooms.game?.channel?.on('game_ended', callback)

export default {
  socket,
  rooms,
  info,

  connect,
  disconnect,
  joinLobby,
  joinGame,
  leaveGame,
  sendMsg,
  startGame,
  restartGame,
  endGame,
  pickCard,
  onMsg,
  onCardPicked,
  onStarted,
  onLeave,
  onRestarted,
  onEnded,
}
