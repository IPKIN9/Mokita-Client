import Api from './Config.js'

const baseUrl = import.meta.env.VITE_MOKITA_URL
const endPoint = '/v1/oauth/token'

export default{
  GetToken(payload) {
    return Api(baseUrl).post(endPoint, payload)
  }
}