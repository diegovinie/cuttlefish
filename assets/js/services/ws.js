import {Socket, Presence} from 'phoenix'
import { parseMsg } from '@/functions'

let socket
const rooms = {}
const info = {
  connected: false,
  username: null,
  inGame: false
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

  return { channel, presence }
}

const pickCard = value => {
  rooms.game?.channel?.push('card_picked', {
    username: info.username, value
  })
}

const onMsg = callback => rooms.lobby?.channel?.on('new_msg', callback)

const onCardPicked = callback => rooms.game?.channel?.on('card_picked', callback)

const startGame = () => {
  rooms.game?.channel?.push('game_started', {
    username: info.username
  })
}

const restartGame = () => {
  rooms.game?.channel?.push('game_restarted', {
    username: info.username
  })
}

const endGame = () => {
  rooms.game?.channel?.push('game_ended', {
    username: info.username
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
  joinLobby,
  joinGame,
  sendMsg,
  startGame,
  restartGame,
  endGame,
  pickCard,
  onMsg,
  onCardPicked,
  onStarted,
  onRestarted,
  onEnded,
}
