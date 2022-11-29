import AuthCheck from './AuthCheck.js'
import Api from './Config.js'

const baseUrl = import.meta.env.VITE_MOKITA_URL
const endPoint = '/v1/userlist/'

export default{
  getList(nama) {
    return Api(baseUrl).get(`${endPoint}?nama=${nama}`, AuthCheck.getToken())
  },

  upsert(payload){
    return Api(baseUrl).post(endPoint, payload, AuthCheck.getToken())
  },

  delete(id){
    return Api(baseUrl).delete(`${endPoint}${id}`, AuthCheck.getToken())
  }
}