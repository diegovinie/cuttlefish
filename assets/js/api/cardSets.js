import { handleResponse } from './functions'

const getAll = params => fetch('/api/cardsets', params)
  .then(handleResponse)

export default {
  getAll
}
