import axios from 'axios'

const options = {
  baseURL: 'https://petstore.swagger.io/v2',
}

const instance = axios.create(options)

export default instance
