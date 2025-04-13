import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (nameNumber) => {
  const request = axios.post(baseUrl, nameNumber)
  return request.then((response) => response.data)
}

const update = (id, nameNumber) => {
  const request = axios.put(`${baseUrl}/${id}`, nameNumber)
  return request.then((response) => response.data)
}

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  del
}