export const parseMsg = ({username, body}) => ({
  username,
  body,
  created_at: new Date()
})
