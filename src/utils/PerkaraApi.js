import AuthCheck from './AuthCheck.js'
import Api from './Config.js'

const baseUrl = import.meta.env.VITE_MOKITA_URL
const endPoint = '/v1/perkara/'

export default{
  getList(limit, page, search) {
    return Api(baseUrl).get(`${endPoint}?limit=${limit}&page=${page}&search=${search}`, AuthCheck.getToken())
  },

  upsert(payload) {
    return Api(baseUrl).post(endPoint, payload, AuthCheck.getToken())
  },

  delete(dataId) {
    return Api(baseUrl).delete(`${endPoint}${dataId}`, AuthCheck.getToken())
  }
}