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
                    <h6 class="font-extrabold mb-0">{{ counting.client }}</h6>
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
                    <h6 class="font-extrabold mb-0">{{ counting.gugatan }}</h6>
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
                    <h6 class="font-extrabold mb-0">{{ counting.perkara }}</h6>
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
                    <h6 class="font-extrabold mb-0">{{ counting.jadwal }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div v-if="progress.length >= 1" class="card mt-3 rounded">
        <div class="card-header">
          <h4>Progress Perkara</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table mb-0">
              <thead>
                <tr>
                  <th scope="col">Nomor Perkara</th>
                  <th scope="col">Hakim</th>
                  <th scope="col">Pengacara</th>
                  <th scope="col">Tanggal Sidang</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(prog, index) in progress" :key="index">
                  <td>{{prog.no_perkara}}</td>
                  <td>{{prog.hakim}}</td>
                  <td>{{prog.pengacara}}</td>
                  <td>{{moment(prog.tgl_sidang).format('DD MMMM, YYYY | hh:mm')}} Wita</td>
                  <td>{{prog.status}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <FooterVue />
  </div>
</template>
<script setup>
import SideBarVue from "../components/skelton/SideBar.vue";
import FooterVue from "../components/skelton/Footer.vue";
import DashboardApi from "../utils/DashboardApi";
import AuthCheck from "../utils/AuthCheck";
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import SweetAlert from "../utils/SweetAlert";
import moment from "moment";

const router = useRouter();
const counting = reactive({
  client: null,
  gugatan: null,
  perkara: null,
  jadwal: null,
});
const progress = ref([])

const getCount = () => {
  DashboardApi.getList()
    .then((res) => {
      let item = res.data;

      for (const key in item.data) {
        counting[key] = item.data[key];
      }

      progress.value = item.progress
    })
    .catch((err) => {
      let code = err.response.status;
      errorHandle(code);
    });
};

const errorHandle = (code) => {
  SweetAlert.alertError(AuthCheck.checkToken(code, goToLogin()));
};

const goToLogin = () => {
  router.replace("/login");
};

onBeforeMount(() => {
  if (AuthCheck.checkToken() === 401 || AuthCheck.checkToken() === 403) {
    goToLogin();
  }
});

onMounted(() => {
  getCount();
});
</script>
