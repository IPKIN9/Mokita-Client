import Api from './Config.js'

const baseUrl = import.meta.env.VITE_MOKITA_URL
const endPoint = '/v1/roles/'

export default{
  getList(email) {
    return Api(baseUrl).get(`${endPoint}?email=${email}`)
  }
}