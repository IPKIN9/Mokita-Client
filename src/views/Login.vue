<template>
  <div id="auth">
    <div class="row h-100">
      <div class="col-lg-5 col-12">
        <div id="auth-left">
          <div class="auth-logo">
            <a href="#"
              ><img src="src/assets/images/logo/logo.png" alt="Logo"
            /></a>
          </div>
          <h1 class="auth-title">Log in.</h1>
          <p class="auth-subtitle mb-5">
            Log in with your data that you entered during registration.
          </p>
            <div class="form-group position-relative has-icon-left mb-4">
              <input
                v-model="payload.username"
                type="text"
                class="form-control form-control-xl"
                placeholder="Username"
              />
              <div class="form-control-icon">
                <i class="bi bi-person"></i>
              </div>
            </div>
            <div class="form-group position-relative has-icon-left mb-4">
              <input
                v-model="payload.password"
                type="password"
                class="form-control form-control-xl"
                placeholder="Password"
              />
              <div class="form-control-icon">
                <i class="bi bi-shield-lock"></i>
              </div>
            </div>
            <button v-if="loading" disabled class="btn btn-secondary btn-block btn-lg shadow-lg mt-5">
              Loading ...
            </button>
            <button v-else @click="login" class="btn btn-primary btn-block btn-lg shadow-lg mt-5">
              Log in
            </button>
        </div>
      </div>
      <div class="col-lg-7 d-none d-lg-block">
        <div id="auth-right"></div>
      </div>
    </div>
  </div>
</template>
<style>
body {
  background-color: #fff;
}
#auth {
  height: 100vh;
  overflow-x: hidden;
}
#auth #auth-right {
  height: 100%;
  background: url(../assets/images/bg/4853433.jpg),
    linear-gradient(90deg, #2d499d, #3f5491);
}
#auth #auth-left {
  padding: 5rem 8rem;
}
#auth #auth-left .auth-title {
  font-size: 4rem;
  margin-bottom: 1rem;
}
#auth #auth-left .auth-subtitle {
  font-size: 1.7rem;
  line-height: 2.5rem;
  color: #a8aebb;
}
#auth #auth-left .auth-logo {
  margin-bottom: 7rem;
}
#auth #auth-left .auth-logo img {
  height: 2rem;
}
@media screen and (max-width: 767px) {
  #auth #auth-left {
    padding: 5rem;
  }
}
</style>
<script setup>
  import { onBeforeMount, reactive, ref } from 'vue';
  import Login from '../utils/Login'
  import { useRouter } from 'vue-router'
  import AuthCheck from '../utils/AuthCheck'
  import GetRole from '../utils/GetRole'
  import CryptoJS from 'crypto-js'

  const loading = ref(false)
  const grantSecret = import.meta.env.VITE_GRANT_SECRET
  const grantId = import.meta.env.VITE_GRANT_ID
  const grantType = import.meta.env.VITE_GRANT_TYPE

  const router = useRouter()
  const payload = reactive({
    client_secret: grantSecret,
    grant_type:grantType,
    client_id: parseInt(grantId),
    username: '',
    password: '',
    scope: ''
  })
  
  const login = () => {
    loading.value = true
    GetRole.getList(payload.username)
    .then((res) => {
      let role = res.data.data.role
      payload.scope = role

      let roleEncrypt = CryptoJS.AES.encrypt(
        role,
        grantSecret
      ).toString()

      localStorage.setItem('roles', roleEncrypt)

      getToken()
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
  }

  const getToken = () => {
    Login.GetToken(payload)
    .then((res) => {
      loading.value = false
      let item = res.data
      localStorage.setItem('user', item.access_token)
      router.replace('/')
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
  }

  onBeforeMount(() => {
    if (AuthCheck.userToken() === 200) {
      router.replace('/')
    }
  })
</script>