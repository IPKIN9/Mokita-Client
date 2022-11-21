import Api from './Config.js'

const baseUrl = import.meta.env.VITE_MOKITA_URL
const endPoint = '/v1/jadwal_sidang/'

export default{
  getList(limit, page, search) {
    return Api(baseUrl).get(`${endPoint}?limit=${limit}&page=${page}&search=${search}`)
  },

  upsert(payload) {
    return Api(baseUrl).post(endPoint, payload)
  },

  delete(dataId) {
    return Api(baseUrl).delete(`${endPoint}${dataId}`)
  }
}