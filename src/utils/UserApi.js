import AuthCheck from './AuthCheck.js'
import Api from './Config.js'

const baseUrl = import.meta.env.VITE_MOKITA_URL
const endPoint = '/v1/userlist/'

export default{
  getList(nama) {
    return Api(baseUrl).get(`${endPoint}?nama=${nama}`)
  }
}