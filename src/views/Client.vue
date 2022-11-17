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
                        <h3>Client</h3>
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
                                        <th>profil</th>
                                        <th style="width: 14%;">aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-uppercase">
                                        <td class="align-top">1.</td>
                                        <td class="align-top">
                                            <span class="fw-bold">Irwandi Paputungan</span> <br>
                                            <div class="d-flex">
                                                <div class="flex-fill text-capitalize">
                                                    <ul class="list-group mt-1">
                                                        <li class="list-group small">Status: Tergugat</li>
                                                        <li class="list-group small">Tempat lahir: Lolak</li>
                                                        <li class="list-group small">Tgl Lahir: 22-09-1999</li>
                                                    </ul>
                                                </div>
                                                <div class="flex-fill text-capitalize">
                                                    <ul class="list-group mt-1">
                                                        <li class="list-group small">Agama: islam</li>
                                                        <li class="list-group small">Pendidikan: s1 komputer</li>
                                                        <li class="list-group small">Pekerjaan: programmer</li>
                                                    </ul>
                                                </div>
                                                <div class="flex-fill text-capitalize">
                                                    <ul class="list-group mt-1">
                                                        <li class="list-group small">Alamat: Jl. asam 1 no 25</li>
                                                        <li class="list-group small">kel. lere, kec. palu barat,
                                                            palu</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- <div v-if="searchField.length < 1" class="d-flex justify-content-center p-5">
                                <div class="fs-3 me-2"><i class="bi bi-emoji-laughing"></i></div>
                                <span class="fs-4 fw-bold text-secondary">Data not
                                    exist</span>
                            </div> -->
                        </div>
                    </div>
                    <!-- <div class="container-fluid row">
                        <PaginationVue :limit="meta.limit" :page="meta.page" :pageOf="meta.pageOf" :total="meta.total"
                            @eventClick="changePaging" />
                    </div> -->
                </div>
            </section>
        </div>
        <FooterVue />
        <BaseModalVue mdSize="modal-lg" idModal="myModal" mdTitle="Insert or update data">
            <template v-slot:body>
                <div class="modal-body">
                    <form class="pt-2 row" style="padding-bottom: 56px;">
                    </form>
                </div>
            </template>
            <template v-slot:footer>
                <BaseButtonVue class="btn-danger rounded px-4">Cancel</BaseButtonVue>
                <BaseButtonVue class="btn-primary rounded px-4 ms-2">Proses</BaseButtonVue>
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

// const getHakimList = () => {
//     HakimApi.getList(meta.limit, meta.page)
//         .then((res) => {
//             let item = res.data

//             hakimList.value = item.data

//             meta.page = item.meta.page
//             meta.pageOf = item.meta.page_of
//             meta.total = item.meta.total
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

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

// const upsertHakim = async () => {
//     let validation = await v$.value.$validate()
//     if (validation) {
//         HakimApi.upsert(payload)
//             .then((res) => {
//                 showHideModal()
//                 let item = res.data
//                 AlertSuccess({
//                     text: item.message
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }
// }

// ##########################################################
// Edit data config
// const editHakim = (params) => {
//     for (const key in params.dataRows) {
//         payload[key] = params.dataRows[key]
//     }
//     console.log(payload);
//     showHideModal()
// }

// ##########################################################
// Delete data config
// const deleteHakim = (params) => {
//     SweetAlert.alertConfirm({
//         title: 'Delete?',
//         confirmtext: 'Yes, Deleted it'
//     })
//         .then((res) => {
//             if (res.isConfirmed) {
//                 if (searchField.value.length === 1 && meta.page != 0) {
//                     search.value = ''
//                     meta.page = meta.page - 1
//                 }
//                 HakimApi.delete(params.dataId)
//                     .then((res) => {
//                         let item = res.data
//                         AlertSuccess({ text: item.message })
//                     })
//                     .catch((err) => {
//                         console.log(err)
//                     })
//             }
//         })
// }

// ##########################################################
// Extends funct
// watch(meta, (newLimit) => {
//     if (newLimit.limit) {
//         getHakimList()
//     }
// })

const search = ref('')

const searchField = computed(() => {
    // return hakimList.value.filter((obj) => {
    //     const computedObj = {
    //         ...obj,
    //         nama: obj.nama,
    //         jabatan: obj.jabatan,
    //     }
    //     return Object.keys(computedObj)
    //         .some(key => ('' + computedObj[key]).toLowerCase().includes(search.value.toLowerCase()))
    // })
});

const changePaging = (params) => {
    if (params === 'next') {
        meta.page = meta.page + 1
    } else {
        meta.page = meta.page - 1
    }
    // getHakimList()
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
    // getHakimList()
    myModal.value = new Modal('#myModal', {
        keyboard: false
    })
})
</script>