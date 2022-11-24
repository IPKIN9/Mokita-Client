import Api from './Config.js'
import AuthCheck from './AuthCheck'

const baseUrl = import.meta.env.VITE_MOKITA_URL
const endPoint = '/v1/dashboard/'

export default{
  getList() {
    return Api(baseUrl).get(endPoint, AuthCheck.getToken())
  }
}