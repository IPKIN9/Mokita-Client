import Api from './Config.js'

const baseUrl = import.meta.env.VITE_MOKITA_URL
const endPoint = '/v1/hakim/'

export default{
  getList(limit, page) {
    return Api(baseUrl).get(`${endPoint}?limit=${limit}&page=${page}`)
  }
}