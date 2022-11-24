<template>
  <div id="main">
    <header class="mb-3">
      <a href="#" class="burger-btn d-block d-xl-none">
        <i class="bi bi-justify fs-3"></i>
      </a>
    </header>
    <SideBarVue />
    <div class="page-heading">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-md-6 order-md-1 order-last">
            <h3>Welcome sir</h3>
            <p class="text-subtitle text-muted">Dashboard panel</p>
          </div>
        </div>
      </div>
      <section class="section">
        <div class="row">
          <div class="col-6 col-lg-3 col-md-6">
            <div class="card">
              <div class="card-body px-3 py-4-5">
                <div class="row">
                  <div class="col-md-4">
                    <div class="stats-icon purple">
                      <i class="bi bi-people-fill"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="text-muted font-semibold">Client</h6>
                    <h6 class="font-extrabold mb-0">{{counting.client}}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-3 col-md-6">
            <div class="card">
              <div class="card-body px-3 py-4-5">
                <div class="row">
                  <div class="col-md-4">
                    <div class="stats-icon blue">
                      <i class="bi bi-file-earmark-text-fill"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="text-muted font-semibold">Gugatan</h6>
                    <h6 class="font-extrabold mb-0">{{counting.gugatan}}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-3 col-md-6">
            <div class="card">
              <div class="card-body px-3 py-4-5">
                <div class="row">
                  <div class="col-md-4">
                    <div class="stats-icon green">
                      <i class="bi bi-file-earmark-person"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="text-muted font-semibold">Perkara</h6>
                    <h6 class="font-extrabold mb-0">{{counting.perkara}}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-3 col-md-6">
            <div class="card">
              <div class="card-body px-3 py-4-5">
                <div class="row">
                  <div class="col-md-4">
                    <div class="stats-icon red">
                      <i class="bi bi-calendar-date-fill"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="text-muted font-semibold">Jadwal Sidang</h6>
                    <h6 class="font-extrabold mb-0">{{counting.jadwal}}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <FooterVue />
  </div>
</template>
<script setup>
import SideBarVue from "../components/skelton/SideBar.vue"
import FooterVue from "../components/skelton/Footer.vue"
import DashboardApi from "../utils/DashboardApi"
import AuthCheck from '../utils/AuthCheck'
import { useRouter } from 'vue-router'
import { onBeforeMount, onMounted, reactive } from "vue"
import SweetAlert from '../utils/SweetAlert'

const router = useRouter()
const counting = reactive({
  client: null,
  gugatan: null,
  perkara: null,
  jadwal: null,
})

const getCount = () => {
  DashboardApi.getList()
  .then((res) => {
    let item = res.data
    for (const key in item.data) {
      counting[key] = item.data[key]
    }
  })
  .catch((err) => {
    let code = err.response.status
    errorHandle(code)
  })
}

const errorHandle = (code) => {
    SweetAlert.alertError(AuthCheck.checkToken(code, goToLogin()))
}

const goToLogin = () => {
    router.replace('/login')
}

onBeforeMount(() => {
    if (AuthCheck.checkToken() === 401) {
        goToLogin()
    }
})

onMounted(() => {
  getCount()
})
</script>
