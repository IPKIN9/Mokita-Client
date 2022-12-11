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
                  <td>{{ prog.no_perkara }}</td>
                  <td>{{ prog.hakim }}</td>
                  <td>{{ prog.pengacara }}</td>
                  <td>{{ moment(prog.tgl_sidang).format('DD MMMM, YYYY | hh:mm') }} Wita</td>
                  <td>{{ prog.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-if="roles === 'crud-list'" class="card-body rounded">
        <BaseButton class="btn-primary mb-3" @clickEvent="showHideModal" typeButton="new-data">Tambah User</BaseButton>
        <div class="table-responsive">
          <table class="table mb-0">
            <thead class="thead-dark">
              <tr class="text-capitalize">
                <th style="width: 4%;">no</th>
                <th>nama</th>
                <th>email</th>
                <th style="width: 16%;">aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-capitalize" v-for="(user, index) in userList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ user.nama }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <BaseButton class="btn-outline-primary btn-sm rounded" @clickEvent="editUser"
                    :dataRows="userList[index]">EDIT
                  </BaseButton>
                  <BaseButton @clickEvent="deleteUser" class="btn-outline-danger btn-sm rounded ms-2" :dataId="user.id">HAPUS
                  </BaseButton>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="userList.length < 1" class="d-flex justify-content-center p-5">
            <div class="fs-3 me-2"><i class="bi bi-emoji-laughing"></i></div>
            <span class="fs-4 fw-bold text-secondary">Data not
              exist</span>
          </div>
        </div>
      </div>
    </div>
    <FooterVue />
  </div>
  <BaseModalVue mdSize="" idModal="myModal" mdTitle="Insert or update data">
    <template v-slot:body>
      <div class="modal-body">
        <form class="pt-2 row" style="padding-bottom: 56px;">
          <div class="form-group">
            <label for="">Nama</label>
            <BaseInput v-model="payload.nama" placeholder="Input here" />
            <span v-for="error in v$.nama.$errors" :key="error.$uid">
              <small class="text-danger">field {{ error.$message }}.</small>
            </span>
          </div>
          <div class="form-group">
            <label for="">Email</label>
            <BaseInput v-model="payload.email" typeOf="email" placeholder="Input here" />
            <span v-for="error in v$.email.$errors" :key="error.$uid">
              <small class="text-danger">field {{ error.$message }}.</small>
            </span>
          </div>
          <div class="form-group">
            <label for="">Password</label>
            <BaseInput v-model="payload.password" placeholder="Input here" />
            <span v-for="error in v$.password.$errors" :key="error.$uid">
              <small class="text-danger">field {{ error.$message }}.</small>
            </span>
          </div>
        </form>
      </div>
    </template>
    <template v-slot:footer>
      <BaseButton @clickEvent="showHideModal" class="btn-danger rounded px-4">Cancel</BaseButton>
      <BaseButton @clickEvent="upsertUser" class="btn-primary rounded px-4 ms-2">Proses</BaseButton>
    </template>
  </BaseModalVue>
</template>
<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, email } from '@vuelidate/validators'
import SideBarVue from "../components/skelton/SideBar.vue";
import FooterVue from "../components/skelton/Footer.vue";
import DashboardApi from "../utils/DashboardApi";
import UserApi from "../utils/UserApi";
import AuthCheck from "../utils/AuthCheck";
import { useRouter } from "vue-router";
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import SweetAlert from "../utils/SweetAlert";
import moment from "moment";
import BaseButton from "../components/button/BaseButton.vue";
import Modal from 'bootstrap/js/dist/modal'
import BaseModalVue from '../components/BaseModal.vue'
import BaseInput from "../components/input/BaseInput.vue";

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

// ###############################################
// Get user list
const userList = ref([]);

const getUser = () => {
  UserApi.getList('')
    .then((res) => {
      let item = res.data
      userList.value = item.data
    }).catch((err) => {
      console.log(err)
    })
}

// ###############################################
// Get user list
const payload = reactive({
  nama: '',
  email: '',
  password: ''
})

const myRegex = helpers.regex(/^[\w\s\d-]+$/d)

const rules = computed(() => {
  return {
    nama: {
      required,
      maxLength: maxLength(100),
      myField: helpers.withMessage('value cannot contain special characters', myRegex)
    },
    email: { required, email },
    password: { required, maxLength: maxLength(15) }
  }
})
const v$ = useVuelidate(rules, payload)

const upsertUser = async () => {
  const validate = await v$.value.$validate()
  if (validate) {
    UserApi.upsert(payload)
      .then((res) => {
        showHideModal()
        let item = res.data
        AlertSuccess({
          text: item.message
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// ###############################################
// Edit user list
const editUser = (params) => {
  const dataRows = params.dataRows
  for (const key in dataRows) {
    if (key === 'password') {
      continue
    }
    payload[key] = dataRows[key]
    console.log(payload)
  }
  showHideModal()
}

// ###############################################
// Edit user list
const deleteUser = (params) => {
  let id = params.dataId
  SweetAlert.alertConfirm({
    title: 'Delete?',
    confirmtext: 'Yes, Deleted it'
  })
    .then((res) => {
      if (res.isConfirmed) {
        UserApi.delete(id)
          .then((res) => {
            let item = res.data
            AlertSuccess({ text: item.message })
          })
          .catch((err) => {
            let code = err.response.status
            errorHandle(code)
          })
      }
    })
}

const myModal = ref(null)

const showHideModal = (params) => {
  if (params && params.typeButton === 'new-data') {
    clearInput()
  }
  myModal.value.show() ? myModal.value.show() : myModal.value.hide()
}

const clearInput = () => {
  v$.value.$reset()
  for (const key in payload) {
    payload[key] = ''
  }

  delete payload.id
}

const AlertSuccess = (options) => {
  SweetAlert.alertSuccess(options.text)
    .then((res) => {
      if (res.isConfirmed) {
        getUser()
        clearInput()
      }
    })
}

const roles = AuthCheck.rolesCheck()

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
  getCount()
  myModal.value = new Modal('#myModal', {
    keyboard: false
  })

  if (roles === 'crud-list') {
    getUser()
  }
});
</script>
