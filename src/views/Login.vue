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
            <button @click="login" class="btn btn-primary btn-block btn-lg shadow-lg mt-5">
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
  import { onBeforeMount, reactive } from 'vue';
  import Login from '../utils/Login'
  import { useRouter } from 'vue-router'
  import AuthCheck from '../utils/AuthCheck'

  const grantToken = import.meta.env.VITE_GRANT_TOKEN

  const router = useRouter()
  const payload = reactive({
    client_secret: grantToken,
    grant_type:"password",
    client_id: 2,
    username: '',
    password: ''
  })
  
  const login = () => {
    Login.GetToken(payload)
    .then((res) => {
      let item = res.data
      localStorage.setItem('user', item.access_token)
      router.replace('/')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  onBeforeMount(() => {
    if (AuthCheck.userToken() === 200) {
      router.replace('/')
    }
  })
</script>