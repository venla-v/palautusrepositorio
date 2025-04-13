import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    name: 'Pöllö Pallero',
    number: '010 010 0100',
  }
  return request.then((response) => response.data.concat(nonExisting))
}

const create = (nameNumber) => {
  const request = axios.post(baseUrl, nameNumber)
  return request.then((response) => response.data)
}

const update = (id, nameNumber) => {
  const request = axios.put(`${baseUrl}/${id}`, nameNumber)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
}