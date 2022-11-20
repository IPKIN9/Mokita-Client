import Api from './Config.js'

const baseUrl = import.meta.env.VITE_MOKITA_URL
const endPoint = '/v1/anak/'

export default{
  getList(gugatan, limit, page,) {
    return Api(baseUrl).get(`${endPoint}?gugatan=${gugatan}&limit=${limit}&page=${page}`)
  },

  upsert(payload) {
    return Api(baseUrl).post(endPoint, payload)
  },

  delete(dataId) {
    return Api(baseUrl).delete(`${endPoint}${dataId}`)
  }
}