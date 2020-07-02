export const parseMsg = ({username, body}) => ({
  username,
  body,
  created_at: new Date()
})

export const replaceUrlParam = query => (key, val) => {
  const params = new URLSearchParams(query)
  params.set(key, val)

  return '?' + params.toString()
}

export const removeUrlParam = query => key => {
  const params = new URLSearchParams(query)
  params.delete(key)

  return '?' + params.toString()
}
