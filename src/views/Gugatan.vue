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
											<BaseButtonVue class="btn-outline-primary btn-sm rounded px-3"
												>EDIT
											</BaseButtonVue>
											<BaseButtonVue class="btn-outline-danger btn-sm rounded mt-2"
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
						<div class="col-lg-6 border-end border-1">
							<div class="col-md-12">
								<div class="form-group">
									<label for="">Penggugat</label>
									<BaseSelectVue v-model="payload.id_penggugat" :options="disPenggugatOptions" :display="diPenggugat" />
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
						</div>
					</form>
				</div>
			</template>
			<template v-slot:footer>
				<BaseButtonVue @clickEvent="showHideModal" class="btn-danger rounded px-4">Cancel</BaseButtonVue>
				<BaseButtonVue class="btn-primary rounded px-4 ms-2">Proses</BaseButtonVue>
			</template>
		</BaseModalVue>
	</div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, numeric } from '@vuelidate/validators'
import GugatanApi from '../utils/GugatanApi'
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
	pincak_konflik: '',
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

// const upsertClient = async () => {
// 	let validation = await v$.value.$validate()
// 	if (validation) {
// 		GugatanApi.upsert(payload)
// 			.then((res) => {
// 				showHideModal()
// 				let item = res.data
// 				AlertSuccess({
// 					text: item.message
// 				})
// 			})
// 			.catch((err) => {
// 				console.log(err)
// 			})
// 	}
// }

// ##########################################################
// Edit data config
// const editClient = (params) => {
// 	for (const key in params.dataRows) {
// 		payload[key] = params.dataRows[key]
// 	}
// 	showHideModal()
// }

// ##########################################################
// Delete data config
// const deleteClient = (params) => {
// 	SweetAlert.alertConfirm({
// 		title: 'Delete?',
// 		confirmtext: 'Yes, Deleted it'
// 	})
// 		.then((res) => {
// 			if (res.isConfirmed) {
// 				if (searchField.value.length === 1 && meta.page != 0) {
// 					search.value = ''
// 					meta.page = meta.page - 1
// 				}
// 				GugatanApi.delete(params.dataId)
// 					.then((res) => {
// 						let item = res.data
// 						AlertSuccess({ text: item.message })
// 					})
// 					.catch((err) => {
// 						console.log(err)
// 					})
// 			}
// 		})
// }

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

const diPenggugat = {
	value: 'id',
	label: 'nama'
}

const searchClint = () => {}

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