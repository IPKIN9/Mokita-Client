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
						<h3>Perkara</h3>
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
										<th>detail</th>
										<th style="width: 23%;">jadwal</th>
										<th style="width: 16%;">aksi</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(perkara,index) in searchField" :key="index" class="text-capitalize">
										<td class="align-top">1.</td>
										<td class="align-top">
											<ul class="list-group list-group-horizontal">
												<li class="list-group text-muted fw-bold col-lg-2">Nomor</li>
												<li class="list-group col-lg-4">: {{perkara.no_perkara}}</li>
												<li class="list-group text-muted fw-bold col-lg-2">Status</li>
												<li class="list-group col-lg-4">: {{perkara.status}}</li>
											</ul>
											<ul class="list-group list-group-horizontal mt-4">
												<li class="list-group text-muted fw-bold col-lg-2">Hakim</li>
												<li class="list-group col-lg-4">: {{perkara.hakim}}</li>
												<li class="list-group text-muted fw-bold col-lg-2">Pengacara</li>
												<li class="list-group col-lg-4">: {{perkara.pengacara}}</li>
											</ul>
											<ul class="list-group list-group-horizontal">
												<li class="list-group text-muted fw-bold col-lg-2">Penitra</li>
												<li class="list-group col-lg-4">: {{perkara.penitra}}</li>
												<li class="list-group text-muted fw-bold col-lg-2">Ket Jadwal</li>
												<li class="list-group col-lg-4">: {{perkara.keterangan}}</li>
											</ul>
										</td>
										<td class="align-top">
											<ul class="list-group list-group-horizontal row">
												<span class="text-muted fw-bold">
													Tgl/Waktu Sidang
												</span>
											</ul>
											<ul class="list-group list-group-horizontal row">
												<span>{{moment(perkara.tgl_sidang).format('DD MMMM, YYYY | hh:mm')}}</span>
											</ul>
											<ul class="list-group list-group-horizontal row mt-1">
												<span class="text-muted fw-bold">
													Tgl/Waktu Sidang Selesai
												</span>
											</ul>
											<ul class="list-group list-group-horizontal row">
												<span>{{moment(perkara.tgl_selesai_sidang).format('DD MMMM, YYYY | hh:mm')}}</span>
											</ul>
										</td>
										<td class="align-middle">
											<BaseButtonVue @clickEvent="editPerkara" class="btn-outline-primary btn-sm rounded"
												:dataRows="searchField[index]">EDIT
											</BaseButtonVue>
											<BaseButtonVue class="btn-outline-danger btn-sm rounded ms-2" @clickEvent="deletePerkara"
												:dataId="perkara.id">HAPUS
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
						<div class="form-group col-lg-12">
							<label for="">Gugatan</label>
							<BaseInputVue @keyup.stop="getGugatanList" v-model="searchName.gugatan" placeholder="Search here..."/>
							<Transition>
								<BaseSelectSearchVue v-show="disGugatanOptions.length != 0" v-model="payload.id_gugatan" :options="disGugatanOptions" 
								:display="disGugatan" @clickEvent="changeGugatanName" />
							</Transition>
							<span v-for="error in v$.id_hakim.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
						<div class="form-group col-lg-12">
							<label for="">Hakim</label>
							<BaseInputVue @keyup.stop="getHakimList" v-model="searchName.hakim" placeholder="Search here..."/>
							<Transition>
								<BaseSelectSearchVue v-show="disHakimOptions.length != 0" v-model="payload.id_hakim" :options="disHakimOptions" 
								@clickEvent="changeHakimName" />
							</Transition>
							<span v-for="error in v$.id_hakim.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
						<div class="form-group col-lg-6">
							<label for="">Pengacara</label>
							<BaseInputVue v-model="payload.pengacara" placeholder="Input here..." />
							<span v-for="error in v$.pengacara.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
						<div class="form-group col-lg-6">
							<label for="">Penitra</label>
							<BaseInputVue v-model="payload.penitra" placeholder="Input here..." />
							<span v-for="error in v$.penitra.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
						<div class="form-group col-lg-6">
							<label for="">status</label>
							<BaseInputVue v-model="payload.status" placeholder="Input here..." />
							<span v-for="error in v$.status.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
						<div class="form-group col-lg-6">
							<label for="">Jadwal Sidang</label>
							<BaseInputVue @keyup.stop="getJadwalList" v-model="searchName.jadwal" placeholder="Search here..."/>
							<Transition>
								<BaseSelectSearchVue v-show="disJadwalOptions.length != 0" v-model="payload.id_jadwal" :options="disJadwalOptions" 
								:display="disJadwal" @clickEvent="changeJadwalName" />
							</Transition>
							<span v-for="error in v$.id_hakim.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
					</form>
				</div>
			</template>
			<template v-slot:footer>
				<BaseButtonVue @clickEvent="showHideModal" class="btn-danger rounded px-4">Cancel</BaseButtonVue>
				<BaseButtonVue @clickEvent="upsertPerkara" class="btn-primary rounded px-4 ms-2">Proses</BaseButtonVue>
			</template>
		</BaseModalVue>
	</div>
</template>
<style>
	.v-enter-active,
	.v-leave-active {
	transition: opacity 0.3s ease;
	}

	.v-enter-from,
	.v-leave-to {
	opacity: 0;
	}
</style>
<script setup>
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, numeric } from '@vuelidate/validators'
import PerkaraApi from '../utils/PerkaraApi'
import HakimApi from '../utils/HakimApi'
import JadwalApi from '../utils/JadwalApi'
import GugatanApi from '../utils/GugatanApi'
import AuthCheck from '../utils/AuthCheck'
import { useRouter } from 'vue-router'
import Modal from 'bootstrap/js/dist/modal'
import SideBarVue from '../components/skelton/SideBar.vue'
import FooterVue from '../components/skelton/Footer.vue'
import BaseSelectVue from '../components/input/BaseSelect.vue'
import BaseSelectSearchVue from '../components/input/BaseSelectSearch.vue'
import BaseInputVue from '../components/input/BaseInput.vue'
import BaseButtonVue from '../components/button/BaseButton.vue'
import PaginationVue from '../components/Pagination.vue'
import BaseModalVue from '../components/BaseModal.vue'
import BaseTextAreaVue from '../components/input/BaseTextArea.vue'
import SweetAlert from '../utils/SweetAlert'
import moment from 'moment'

// ##########################################################
// Get data config
const router = useRouter()
const perkaraList = ref([])
const meta = reactive({
	limit: 10,
	page: 1,
	pageOf: 10,
	total: 10
})

const getPerkaraList = () => {
	PerkaraApi.getList(meta.limit, meta.page, '', '')
		.then((res) => {
			let item = res.data

			perkaraList.value = item.data

			meta.page = item.meta.page
			meta.pageOf = item.meta.page_of
			meta.total = item.meta.total
		})
		.catch((err) => {
			let code = err.response.status
    		errorHandle(code)
		})
}

// ##########################################################
// Upsert data config
const payload = reactive({
	id_hakim: '',
	pengacara: '',
	penitra: '',
	id_gugatan: '',
	status: '',
	id_jadwal: '',
})

const myRegex = helpers.regex(/^[\w\s\d-]+$/d)

const rules = computed(() => {
	return {
		id_hakim: {
			required,
		},
		pengacara: {
			required,
			maxLength: maxLength(100),
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
		penitra: {
			required,
			maxLength: maxLength(100),
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
		id_gugatan: {
			required,
		},
		status: {
			required,
			maxLength: maxLength(50)
		},
		id_jadwal: {
			required,
		},
	}
})
const v$ = useVuelidate(rules, payload)

const upsertPerkara = async () => {
	let validation = await v$.value.$validate()
	if (validation) {
		PerkaraApi.upsert(payload)
			.then((res) => {
				showHideModal()
				let item = res.data
				AlertSuccess({
					text: item.message
				})
			})
			.catch((err) => {
				let code = err.response.status
    			errorHandle(code)
			})
	}
}

// ##########################################################
// Edit data config
const editPerkara = (params) => {
	for (const key in params.dataRows) {
		payload[key] = params.dataRows[key]
	}
	searchName.gugatan = params.dataRows['no_akta_nikah']
	searchName.hakim = params.dataRows['hakim']
	searchName.jadwal = params.dataRows['keterangan']
	showHideModal()
}

// ##########################################################
// Delete data config
const deletePerkara = (params) => {
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
				PerkaraApi.delete(params.dataId)
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

// ##########################################################
// Extends funct
watch(meta, (newLimit) => {
	if (newLimit.limit) {
		getPerkaraList()
	}
})

const search = ref('')

const searchField = computed(() => {
	return perkaraList.value.filter((obj) => {
		const computedObj = {
			...obj,
			no_perkara: obj.no_perkara
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
	getPerkaraList()
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


const disHakimOptions = ref([])
const disGugatanOptions = ref([])
const disJadwalOptions = ref([])

const disGugatan = {
	value: 'id',
	label: 'akta_nikah',
}

const disJadwal = {
	value: 'id',
	label: 'ket',
}

const searchName = reactive({
	hakim: '',
	gugatan: '',
	jadwal: ''
})

const getHakimList = () => {
	if (searchName.hakim.length >= 1) {
		HakimApi.getList(100, 1, searchName.hakim)
		.then((res) => {
			let item = res.data
			disHakimOptions.value = item.data
		})
		.catch((err) => {
			let code = err.response.status
			errorHandle(code)
		})
	} else {
		disHakimOptions.value = []
	}
}

const getGugatanList = () => {
	if (searchName.gugatan.length >= 1) {
		GugatanApi.getList(100, 1, searchName.gugatan)
		.then((res) => {
			let item = res.data
			disGugatanOptions.value = item.data
		})
		.catch((err) => {
			let code = err.response.status
    		errorHandle(code)
		})
	} else {
		disGugatanOptions.value = []
	}
}

const getJadwalList = () => {
	if (searchName.jadwal.length >= 1) {
		JadwalApi.getList(100, 1, searchName.jadwal)
		.then((res) => {
			let item = res.data
			disJadwalOptions.value = item.data
		})
		.catch((err) => {
			let code = err.response.status
    		errorHandle(code)
		})
	} else {
		disJadwalOptions.value = []
	}
}

const changeHakimName = (params) => {
	searchName.hakim = params.nama
	disHakimOptions.value = []
}

const changeGugatanName = (params) => {
	searchName.gugatan = params.nama
	disGugatanOptions.value = []
}

const changeJadwalName = (params) => {
	searchName.jadwal = params.nama
	disJadwalOptions.value = []
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
	delete payload.no_perkara
	
	searchName.gugatan = ''
	searchName.hakim = ''
	searchName.jadwal = ''
}

const AlertSuccess = (options) => {
	SweetAlert.alertSuccess(options.text)
		.then((res) => {
			if (res.isConfirmed) {
				getPerkaraList()
				clearInput()
			}
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
	getPerkaraList()
	myModal.value = new Modal('#myModal', {
		keyboard: false
	})
})
</script>