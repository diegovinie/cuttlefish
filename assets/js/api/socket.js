import {Socket, Presence} from 'phoenix'

export const connectToLobby = ({ username }) => {
  const socket = new Socket('/socket', { params: { username } })

  socket.connect()

  const channel = socket.channel('room:lobby', {})
  const presence = new Presence(channel)

  channel.join()
    .receive('ok', resp => { console.log('Joined successfully', resp) })
    .receive('error', resp => { console.log('Unable to join', resp) })

  return {
    channel,
    presence,
    socket
  }
}
