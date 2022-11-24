import CryptoJS from 'crypto-js'

const grantSecret = import.meta.env.VITE_GRANT_SECRET

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
            localStorage.removeItem('roles')
            callback
            return 'Sesi login telah kadarluasa'
        } else {
            return 'Ada yang salah'
        }
    },

    rolesCheck(){
        let roleEncrypt = localStorage.getItem("roles") || null
        if (roleEncrypt) {
            let roleDecrypt = CryptoJS.AES.decrypt(
                roleEncrypt,
                grantSecret
            ).toString(CryptoJS.enc.Utf8)
            return roleDecrypt
        }
        return roleEncrypt
    }
}