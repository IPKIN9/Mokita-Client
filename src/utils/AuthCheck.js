
export default {
    userToken(){
        let token = localStorage.getItem('user')
        if (token) {
            return 200
        } else {
            return 401
        }
    },
    
    getToken(){
        const userToken = localStorage.getItem("user")
        return {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
    },

    checkToken(code, callback){
        if (code === 401) {
            localStorage.removeItem('user')
            callback
            return 'Sesi login telah kadarluasa'
        } else {
            return 'Ada yang salah'
        }
    }
}