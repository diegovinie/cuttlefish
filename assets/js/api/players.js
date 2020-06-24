import { handleResponse } from './functions'

const endpoint = '/api/players'

const lookUp = (username, options = {}) =>
  fetch(`${endpoint}/search?username=${username}`, options)
    .then(handleResponse)

const create = (fields, options = {}) =>
  fetch(endpoint, Object.assign(options, {
    method: 'POST',
    body: JSON.stringify({ player: fields }),
    headers:{
      'Content-Type': 'application/json'
    }
  }))
    .then(handleResponse)

const getById = (id, options = {}) =>
  fetch(`${endpoint}/${id}`, options)

export default {
  lookUp,
  create,
  getById
}
