import { handleResponse } from './functions'

const endpoint = '/api/players'

const lookUp = (nickname, options = {}) =>
  fetch(`${endpoint}/search?nickname=${nickname}`, options)
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
