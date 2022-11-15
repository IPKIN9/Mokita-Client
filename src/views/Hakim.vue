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
                <div class="row my-3 pe-3">
                    <div class="col-10">
                        <h3>Hakim</h3>
                    </div>
                    <BaseButtonVue @clickEvent="showHideModal" typeButton="new-data" class="btn-primary rounded col-2">
                        Tambah Data
                    </BaseButtonVue>
                </div>
            </div>
            <section class="section">
                <div class="card py-3">
                    <div class="container-fluid mt-3 row">
                        <div class="col-lg-1">
                            <BaseSelectVue v-model.number="meta.limit" :options="disDataOptions" :display="diData" />
                        </div>
                        <label class="col-lg-8 py-2">Data Tampil</label>
                        <BaseInputVue v-model="search" class="col" placeholder="Search..." />
                    </div>
                    <div class="card-body rounded">
                        <div class="table-responsive">
                            <table class="table mb-0">
                                <thead class="thead-dark">
                                    <tr class="text-capitalize">
                                        <th style="width: 4%;">no</th>
                                        <th>nama</th>
                                        <th>ttl</th>
                                        <th>jabatan</th>
                                        <th>pendidikan</th>
                                        <th>sertifikat</th>
                                        <th style="width: 14%;">aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(hakim, index) in searchField" :key="index" class="text-uppercase">
                                        <td class="align-top">{{ index + 1 }}.</td>
                                        <td class="align-top">
                                            <span class="text-bold-500">{{ hakim.nama }}</span><br>
                                            <small>{{ hakim.nip }}</small>
                                        </td>
                                        <td class="align-top">{{ hakim.tempat_lahir }} <br> {{ hakim.tgl_lahir }}
                                        </td>
                                        <td class="align-top">{{ hakim.jabatan }}</td>
                                        <td class="align-top">
                                            <ul>
                                                <li>{{ hakim.s1 }}</li>
                                                <li v-if="hakim.s2">{{ hakim.s2 }}</li>
                                                <li v-if="hakim.s3">{{ hakim.s3 }}</li>
                                            </ul>
                                        </td>
                                        <td class="align-top">{{ hakim.sertifikat }}</td>
                                        <td class="align-top">
                                            <BaseButtonVue class="btn-outline-primary btn-sm rounded"
                                                @clickEvent="editHakim" :dataRows="hakimList[index]">EDIT
                                            </BaseButtonVue>
                                            <BaseButtonVue class="btn-outline-danger btn-sm rounded ms-2"
                                                @clickEvent="deleteHakim" :dataId="hakim.id">HAPUS
                                            </BaseButtonVue>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-if="searchField.length < 1" class="d-flex justify-content-center p-5">
                                <div class="fs-3 me-2"><i class="bi bi-emoji-laughing"></i></div>
                                <span class="fs-4 fw-bold text-secondary">Data not
                                    exist</span>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid row">
                        <PaginationVue :limit="meta.limit" :page="meta.page" :pageOf="meta.pageOf" :total="meta.total"
                            @eventClick="changePaging" />
                    </div>
                </div>
            </section>
        </div>
        <FooterVue />
        <BaseModalVue mdSize="modal-lg" idModal="myModal" mdTitle="Insert or update data">
            <template v-slot:body>
                <div class="modal-body">
                    <form class="pt-2 row" style="padding-bottom: 56px;">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="helpInputTop">Nama</label>
                                <BaseInputVue v-model="payload.nama" placeholder="Input here..." />
                                <span v-for="error in v$.nama.$errors" :key="error.$uid">
                                    <small class="text-danger">field {{ error.$message }}.</small>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="helpInputTop">Nip</label>
                                <BaseInputVue v-model="payload.nip" typeOf="number" placeholder="Input here..." />
                                <span v-for="error in v$.nip.$errors" :key="error.$uid">
                                    <small class="text-danger">field {{ error.$message }}.</small>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <div class="form-group">
                                <label for="helpInputTop">Tempat Lahir</label>
                                <BaseInputVue v-model="payload.tempat_lahir" placeholder="Input here..." />
                                <span v-for="error in v$.tempat_lahir.$errors" :key="error.$uid">
                                    <small class="text-danger">field {{ error.$message }}.</small>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <div class="form-group">
                                <label for="helpInputTop">Tanggal Lahir</label>
                                <BaseInputVue v-model="payload.tgl_lahir" typeOf="date" placeholder="Input here..." />
                                <span v-for="error in v$.tgl_lahir.$errors" :key="error.$uid">
                                    <small class="text-danger">field {{ error.$message }}.</small>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <div class="form-group">
                                <label for="helpInputTop">Jabatan</label>
                                <BaseSelectVue v-model="payload.jabatan" :options="disJabatanOptions"
                                    :display="diJabatan" />
                                <span v-for="error in v$.jabatan.$errors" :key="error.$uid">
                                    <small class="text-danger">field {{ error.$message }}.</small>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <div class="form-group">
                                <label for="helpInputTop">Nomor Sertifikat</label>
                                <BaseInputVue v-model="payload.sertifikat" placeholder="Input here..." />
                                <span v-for="error in v$.sertifikat.$errors" :key="error.$uid">
                                    <small class="text-danger">field {{ error.$message }}.</small>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-4 mt-3">
                            <BaseTextAreaVue v-model="payload.s1" label="Pendidikan S1" />
                            <span v-for="error in v$.s1.$errors" :key="error.$uid">
                                <small class="text-danger">field {{ error.$message }}.</small>
                            </span>
                        </div>
                        <div class="col-lg-4 mt-3">
                            <BaseTextAreaVue v-model="payload.s2" label="Pendidikan S2" />
                        </div>
                        <div class="col-lg-4 mt-3">
                            <BaseTextAreaVue v-model="payload.s3" label="Pendidikan S3" />
                        </div>
                    </form>
                </div>
            </template>
            <template v-slot:footer>
                <BaseButtonVue @clickEvent="showHideModal" class="btn-danger rounded px-4">Cancel</BaseButtonVue>
                <BaseButtonVue @clickEvent="upsertHakim" class="btn-primary rounded px-4 ms-2">Proses</BaseButtonVue>
            </template>
        </BaseModalVue>
    </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, numeric } from '@vuelidate/validators'
import HakimApi from '../utils/HakimApi'
import Modal from 'bootstrap/js/dist/modal'
import SideBarVue from '../components/skelton/SideBar.vue'
import FooterVue from '../components/skelton/Footer.vue'
import BaseSelectVue from '../components/input/BaseSelect.vue'
import BaseInputVue from '../components/input/BaseInput.vue'
import BaseButtonVue from '../components/button/BaseButton.vue'
import PaginationVue from '../components/Pagination.vue'
import BaseModalVue from '../components/BaseModal.vue'
import BaseTextAreaVue from '../components/input/BaseTextArea.vue'
import SweetAlert from '../utils/SweetAlert'

// ##########################################################
// Get data config
const hakimList = ref([])
const meta = reactive({
    limit: 10,
    page: 1,
    pageOf: 10,
    total: 10
})

const getHakimList = () => {
    HakimApi.getList(meta.limit, meta.page)
        .then((res) => {
            let item = res.data

            hakimList.value = item.data

            meta.page = item.meta.page
            meta.pageOf = item.meta.page_of
            meta.total = item.meta.total
        })
        .catch((err) => {
            console.log(err);
        })
}

// ##########################################################
// Upsert data config
const payload = reactive({
    nama: '',
    nip: '',
    tempat_lahir: '',
    tgl_lahir: '',
    jabatan: '',
    s1: '',
    s2: '',
    s3: '',
    sertifikat: '',
})

const myRegex = helpers.regex(/^[\w\s\d-]+$/d)

const rules = computed(() => {
    return {
        nama: {
            required,
            maxLength: maxLength(100),
            myField: helpers.withMessage('value cannot contain special characters', myRegex)
        },
        nip: {
            required,
            numeric,
            maxLength: maxLength(13),
        },
        tempat_lahir: {
            required,
            maxLength: maxLength(150)
        },
        tgl_lahir: { required },
        jabatan: {
            required,
            maxLength: maxLength(100)
        },
        s1: { required },
        sertifikat: {
            required,
            maxLength: maxLength(100)
        }
    }
})
const v$ = useVuelidate(rules, payload)

const upsertHakim = async () => {
    let validation = await v$.value.$validate()
    if (validation) {
        HakimApi.upsert(payload)
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

// ##########################################################
// Edit data config
const editHakim = (params) => {
    for (const key in params.dataRows) {
        payload[key] = params.dataRows[key]
    }
    console.log(payload);
    showHideModal()
}

// ##########################################################
// Delete data config
const deleteHakim = (params) => {
    SweetAlert.alertConfirm({
        title: 'Delete?',
        confirmtext: 'Yes, Deleted it'
    })
        .then((res) => {
            if (res.isConfirmed) {
                if (searchField.value.length === 1 && meta.page != 0) {
                    search.value = ''
                    meta.page = meta.page - 1
                }
                HakimApi.delete(params.dataId)
                    .then((res) => {
                        let item = res.data
                        AlertSuccess({ text: item.message })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
}

// ##########################################################
// Extends funct
watch(meta, (newLimit) => {
    if (newLimit.limit) {
        getHakimList()
    }
})

const search = ref('')

const searchField = computed(() => {
    return hakimList.value.filter((obj) => {
        const computedObj = {
            ...obj,
            nama: obj.nama,
            jabatan: obj.jabatan,
        }
        return Object.keys(computedObj)
            .some(key => ('' + computedObj[key]).toLowerCase().includes(search.value.toLowerCase()))
    })
});

const changePaging = (params) => {
    if (params === 'next') {
        meta.page = meta.page + 1
    } else {
        meta.page = meta.page - 1
    }
    getHakimList()
}

const disDataOptions = [
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
]

const diData = {
    value: 'value',
    label: 'label'
}

const disJabatanOptions = [
    { value: 'Hakim Ketua', label: 'Hakim Ketua' },
    { value: 'Hakim Pendamping', label: 'Hakim Pendamping' },
]

const diJabatan = {
    value: 'value',
    label: 'label'
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
        for (const key in payload) {
            payload[key] = ''
        }
        delete payload.id
    }
}

const AlertSuccess = (options) => {
    SweetAlert.alertSuccess(options.text)
        .then((res) => {
            if (res.isConfirmed) {
                getHakimList()
                clearInput()
            }
        })
}

onMounted(() => {
    getHakimList()
    myModal.value = new Modal('#myModal', {
        keyboard: false
    })
})
</script>