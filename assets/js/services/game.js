import {Socket, Presence} from 'phoenix'
import { parseMsg } from '@/functions'

let socket
const rooms = {}
const info = {
  connected: false,
  username: null
}

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

  channel.join()
    .receive('ok', resp => { console.log('Joined successfully', resp) })
    .receive('error', resp => { console.log('Unable to join', resp) })

  rooms.lobby = { channel, presence }

  return { channel, presence }
}

const sendMsg = msg => {
  rooms.lobby?.channel?.push('new_msg', parseMsg({
    username: info.username, body: msg
  }))
}

const pickCard = ({ username, value }) => {
  rooms.game?.channel?.push('card_picked', {
    username: info.usernames, value
  })
}

const onMsg = callback => rooms.lobby?.channel?.on('new_msg', callback)

const onCardPicked = callback => rooms.game?.channel?.on('card_picked', callback)


export default {
  socket,
  rooms,
  info,
  
  connect,
  joinLobby,
  sendMsg,
  pickCard,
  onMsg,
  onCardPicked
}
