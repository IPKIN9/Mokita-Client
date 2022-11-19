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
						<h3>Gugatan</h3>
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
										<th>data gugatan</th>
										<th style="width: 8%;">aksi</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(gugat, index) in gugatanList" class="text-capitalize">
										<td class="align-top">{{index + 1}}.</td>
										<td class="align-top row">
											<div class="col-lg-6">Data client
												<div class="row mt-2">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Penggugat</div>
													<div class="col-lg-7">: {{gugat.penggugat}}</div>
												</div>
												<div class="row">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Tergugat</div>
													<div class="col-lg-7">: {{gugat.tergugat}}</div>
												</div>
												<div class="row mt-2">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Tgl Pernikahan</div>
													<div class="col-lg-7">: {{moment(gugat.tgl_pernikahan).format('DD MMMM, YYYY')}}</div>
												</div>
												<div class="row">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">No. Akta Nikah</div>
													<div class="col-lg-7">: {{gugat.akta_nikah}}</div>
												</div>
											</div>
											<div class="col-lg-6">Detail Gugatan
												<div class="row mt-2">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Penyebab Pisah</div>
													<div class="col-lg-7">: {{gugat.penyebab}}</div>
												</div>
												<div class="row">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Tgl Tidak Rukun</div>
													<div class="col-lg-7">: {{moment(gugat.tgl_tidak_rukun).format('DD MMMM, YYYY')}}</div>
												</div>
												<div class="row mt-2">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Puncak Konflik</div>
													<div class="col-lg-7">: {{moment(gugat.puncak_konflik).format('DD MMMM, YYYY')}}</div>
												</div>
												<div class="row">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Lama Pisah</div>
													<div class="col-lg-7">: {{gugat.lama_pisah}} Hari</div>
												</div>
											</div>
											<div class="col-lg-6 mt-4">
												<div class="row">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Tempat Tinggal Pertama Setelah Pisah</div>
													<div class="col-lg-7">: {{gugat.tinggal1}}</div>
												</div>
											</div>
											<div class="col-lg-6 mt-4">
												<div class="row">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Kecamatan</div>
													<div class="col-lg-7">: {{gugat.kec}}</div>
												</div>
											</div>
											<div class="col-lg-6">
												<div class="row mt-1">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Tempat Tinggal Kedua Setelah Pisah</div>
													<div class="col-lg-7">: {{gugat.tinggal2}}</div>
												</div>
											</div>
											<div class="col-lg-6 mt-4">
												<div class="row">
													<div class="col-lg-5 fw-bold text-uppercase text-muted">Kabupaten</div>
													<div class="col-lg-7">: {{gugat.kab}}</div>
												</div>
											</div>
										</td>
										<td class="align-middle text-center">
											<BaseButtonVue @clickEvent="editGugatan" :dataRows="gugatanList[index]" class="btn-outline-primary btn-sm rounded px-3"
												>EDIT
											</BaseButtonVue>
											<BaseButtonVue @clickEvent="deleteGugatan" :dataId="gugat.id" class="btn-outline-danger btn-sm rounded mt-2"
												>HAPUS
											</BaseButtonVue>
										</td>
									</tr>
								</tbody>
							</table>
							<div v-if="gugatanList.length < 1" class="d-flex justify-content-center p-5">
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
		<BaseModalVue mdSize="modal-xl" idModal="myModal" mdTitle="Insert or update data">
			<template v-slot:body>
				<div class="modal-body">
					<form class="pt-2 row" style="padding-bottom: 56px;">
						<div class="col-lg-6 row">
							<div class="col-md-12 mb-3">
								<div class="form-group">
									<label for="">Penggugat</label>
									<BaseInputVue @keyup.stop="getClientList('penggugat')" v-model="searchName.penggugat" placeholder="Search here..."/>
									<Transition>
										<BaseSelectSearchVue v-show="disPenggugatOptions.length != 0" v-model="payload.id_penggugat" :options="disPenggugatOptions" 
										:display="diGugat" @clickEvent="changeName" />
									</Transition>
									<span v-for="error in v$.id_penggugat.$errors" :key="error.$uid">
										<small class="text-danger">field {{ error.$message }}.</small>
									</span>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="form-group">
									<label for="">Tanggal Pernikahan</label>
									<BaseInputVue v-model="payload.tgl_pernikahan" typeOf="date" placeholder="Input here..." />
									<span v-for="error in v$.tgl_pernikahan.$errors" :key="error.$uid">
										<small class="text-danger">field {{ error.$message }}.</small>
									</span>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="form-group">
									<label for="">Akta Nikah</label>
									<BaseInputVue v-model="payload.akta_nikah" placeholder="Input here..." />
									<span v-for="error in v$.akta_nikah.$errors" :key="error.$uid">
										<small class="text-danger">field {{ error.$message }}.</small>
									</span>
								</div>
							</div>
							<div class="col-lg-12 mb-2">
								<div class="form-group">
									<label for="">Lama Pisah <small class="text-danger">satuan hari</small></label>
									<BaseInputVue v-model="payload.lama_pisah" typeOf="number" placeholder="Input here..." />
									<span v-for="error in v$.lama_pisah.$errors" :key="error.$uid">
										<small class="text-danger">field {{ error.$message }}.</small>
									</span>
								</div>
							</div>
							<small class="text-muted">Detail</small>
							<div class="col-lg-12 mt-3">
								<BaseTextAreaVue v-model="payload.kec" label="Kecamatan" />
								<span v-for="error in v$.kec.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
							<div class="col-lg-12 mt-3">
								<BaseTextAreaVue v-model="payload.kab" label="Kabupaten" />
								<span v-for="error in v$.kab.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-6 row">
							<div class="col-md-12 mb-3">
								<div class="form-group">
									<label for="">Tergugat</label>
									<BaseInputVue @keyup.stop="getClientList('tergugat')" v-model="searchName.tergugat" placeholder="Search here..."/>
									<Transition>
										<BaseSelectSearchVue v-show="disTergugatOptions.length != 0" v-model="payload.id_tergugat" :options="disTergugatOptions" 
										:display="diGugat" @clickEvent="changeName" />
									</Transition>
									<span v-for="error in v$.id_penggugat.$errors" :key="error.$uid">
										<small class="text-danger">field {{ error.$message }}.</small>
									</span>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="form-group">
									<label for="">Tanggal Tidak Rukun</label>
									<BaseInputVue v-model="payload.tgl_tidak_rukun" typeOf="date" placeholder="Input here..." />
									<span v-for="error in v$.tgl_tidak_rukun.$errors" :key="error.$uid">
										<small class="text-danger">field {{ error.$message }}.</small>
									</span>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="form-group">
									<label for="">Puncak Konflik</label>
									<BaseInputVue v-model="payload.puncak_konflik" typeOf="date" placeholder="Input here..." />
									<span v-for="error in v$.puncak_konflik.$errors" :key="error.$uid">
										<small class="text-danger">field {{ error.$message }}.</small>
									</span>
								</div>
							</div>
							<div class="col-lg-12 mb-2">
								<div class="form-group">
									<label for="">Penyebab</label>
									<BaseInputVue v-model="payload.penyebab" placeholder="Input here..." />
									<span v-for="error in v$.penyebab.$errors" :key="error.$uid">
										<small class="text-danger">field {{ error.$message }}.</small>
									</span>
								</div>
							</div>
							<small class="text-muted">Tinggal</small>
							<div class="col-lg-12 mt-3">
								<BaseTextAreaVue v-model="payload.tinggal1" label="Tinggal Pertama Setelah Pisah" />
								<span v-for="error in v$.tinggal1.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
							<div class="col-lg-12 mt-3">
								<BaseTextAreaVue v-model="payload.tinggal2" label="Tinggal Kedua Setelah Pisah" />
								<span v-for="error in v$.tinggal2.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
					</form>
				</div>
			</template>
			<template v-slot:footer>
				<BaseButtonVue @clickEvent="showHideModal" class="btn-danger rounded px-4">Cancel</BaseButtonVue>
				<BaseButtonVue @clickEvent="upsertGugatan" class="btn-primary rounded px-4 ms-2">Proses</BaseButtonVue>
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
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, } from '@vuelidate/validators'
import GugatanApi from '../utils/GugatanApi'
import ClientApi from '../utils/ClientApi'
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
const gugatanList = ref([])
const meta = reactive({
	limit: 10,
	page: 1,
	pageOf: 10,
	total: 10
})

const getGugatanList = () => {
	GugatanApi.getList(meta.limit, meta.page)
		.then((res) => {
			let item = res.data

			gugatanList.value = item.data

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
	id_penggugat: '',
	id_tergugat: '',
	tgl_pernikahan: '',
	akta_nikah: '',
	tinggal1: '',
	tinggal2: '',
	tgl_tidak_rukun: '',
	penyebab: '',
	puncak_konflik: '',
	lama_pisah: '',
	kec: '',
	kab: '',
})

const rules = computed(() => {
	return {
		id_penggugat: {required},
		id_tergugat: {required},
		tgl_pernikahan: {required},
		akta_nikah: {required, maxLength: maxLength(25)},
		tinggal1: {required, maxLength:maxLength(150)},
		tinggal2: {required, maxLength:maxLength(150)},
		tgl_tidak_rukun: {required},
		penyebab: {required, maxLength:maxLength(50)},
		puncak_konflik: {required},
		lama_pisah: {required, maxLength:maxLength(10)},
		kec: {required, maxLength:maxLength(25)},
		kab: {required, maxLength:maxLength(25)},
	}
})
const v$ = useVuelidate(rules, payload)

const upsertGugatan = async () => {
	let validation = await v$.value.$validate()
	if (validation) {
		GugatanApi.upsert(payload)
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
const editGugatan = (params) => {
	clearInput()
	for (const key in params.dataRows) {
		payload[key] = params.dataRows[key]
	}
	searchName.penggugat = params.dataRows['penggugat']
	searchName.tergugat = params.dataRows['tergugat']

	showHideModal()
}

// ##########################################################
// Delete data config
const deleteGugatan = (params) => {
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
				GugatanApi.delete(params.dataId)
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
		getGugatanList()
	}
})

const search = ref('')

const searchField = computed(() => {
	return gugatanList.value.filter((obj) => {
		const computedObj = {
			...obj,
			nama: obj.nama,
			status: obj.status,
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
	getGugatanList()
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

const disPenggugatOptions = ref([])
const disTergugatOptions = ref([])

const diGugat = {
	value: 'id',
	label: 'nama'
}

const searchName = reactive({
	penggugat: '',
	tergugat: ''
})

const getClientList = (status) => {
	ClientApi.getList(100, 1, searchName[status], status)
	.then((res) => {
		let item = res.data
		if (status === 'penggugat') {
			disPenggugatOptions.value = item.data
		} else {
			disTergugatOptions.value = item.data
		}
	})
	.catch((err) => {
		console.log(err)
	})
}

const changeName = (params) => {
	if (params.status === "penggugat") {
		searchName.penggugat = params.nama
		disPenggugatOptions.value = []
	} else if (params.status === "tergugat") {
		searchName.tergugat = params.nama
		disTergugatOptions.value = []
	}
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
	}
	searchName.penggugat = ''
	searchName.tergugat = ''

	disPenggugatOptions.value = []
	disTergugatOptions.value = []

	delete payload.id
}

const AlertSuccess = (options) => {
	SweetAlert.alertSuccess(options.text)
		.then((res) => {
			if (res.isConfirmed) {
				getGugatanList()
				clearInput()
			}
		})
}

onMounted(() => {
	getGugatanList()
	myModal.value = new Modal('#myModal', {
		keyboard: false
	})
})
</script>