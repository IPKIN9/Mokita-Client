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
										<th style="width: 16%;">aksi</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(client, index) in searchField" class="text-uppercase">
										<td class="align-top">{{ index + 1 }}.</td>
										<td class="align-top">
											<span class="fw-bold">{{ client.nama }} {{ client.marga }}</span> <br>
											<div class="d-flex">
												<div class="flex-fill text-capitalize">
													<ul class="list-group mt-1">
														<li class="list-group small">Status: {{ client.status }}</li>
														<li class="list-group small">Tempat lahir: {{ client.tempat_lahir }}</li>
														<li class="list-group small">Tgl Lahir: {{ moment(client.tgl_lahir).format('DD MMMM, YYYY')
														}}
														</li>
													</ul>
												</div>
												<div class="flex-fill text-capitalize">
													<ul class="list-group mt-1">
														<li class="list-group small">Agama: {{ client.agama }}</li>
														<li class="list-group small">Pendidikan: {{ client.pendidikan }}</li>
														<li class="list-group small">Pekerjaan: {{ client.pekerjaan }}</li>
													</ul>
												</div>
												<div class="flex-fill text-capitalize">
													<ul class="list-group mt-1">
														<li class="list-group small">Alamat: {{ client.alamat }}</li>
														<li class="list-group small">kel. {{ client.kel }}, kec. {{ client.kec }},
															{{ client.kab }}</li>
													</ul>
												</div>
											</div>
										</td>
										<td class="align-middle">
											<BaseButtonVue @clickEvent="editClient" class="btn-outline-primary btn-sm rounded"
												:dataRows="searchField[index]">EDIT
											</BaseButtonVue>
											<BaseButtonVue class="btn-outline-danger btn-sm rounded ms-2" @clickEvent="deleteClient"
												:dataId="client.id">HAPUS
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
						<div class="col-lg-12">
							<div class="form-group">
								<label for="">Status</label>
								<BaseSelectVue v-model="payload.status" :options="disStatusOptions" :display="diStatus" />
								<span v-for="error in v$.status.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-6" mt-3>
							<div class="form-group">
								<label for="">Nama</label>
								<BaseInputVue v-model="payload.nama" placeholder="Input here..." />
								<span v-for="error in v$.nama.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-6" mt-3>
							<div class="form-group">
								<label for="">Marga</label>
								<BaseInputVue v-model="payload.marga" placeholder="Input here..." />
								<span v-for="error in v$.marga.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="form-group">
								<label for="">Tempat Lahir</label>
								<BaseInputVue v-model="payload.tempat_lahir" placeholder="Input here..." />
								<span v-for="error in v$.tempat_lahir.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="form-group">
								<label for="">Tanggal Lahir</label>
								<BaseInputVue v-model="payload.tgl_lahir" typeOf="date" placeholder="Input here..." />
								<span v-for="error in v$.tgl_lahir.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="form-group">
								<label for="">Agama</label>
								<BaseSelectVue v-model="payload.agama" :options="disAgamaOptions" :display="diAgama" />
								<span v-for="error in v$.agama.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="form-group">
								<label for="">Pendidikan</label>
								<BaseInputVue v-model="payload.pendidikan" placeholder="Input here..." />
								<span v-for="error in v$.pendidikan.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="form-group">
								<label for="">Pekerjaan</label>
								<BaseInputVue v-model="payload.pekerjaan" placeholder="Input here..." />
								<span v-for="error in v$.pekerjaan.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-12 mt-3 mb-3">
							<BaseTextAreaVue v-model="payload.alamat" label="Alamat" />
							<span v-for="error in v$.alamat.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<label for="">Kelurahan</label>
								<BaseInputVue v-model="payload.kel" placeholder="Input here..." />
								<span v-for="error in v$.kel.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<label for="">Kecamataan</label>
								<BaseInputVue v-model="payload.kec" placeholder="Input here..." />
								<span v-for="error in v$.kec.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<label for="">Kabupaten</label>
								<BaseInputVue v-model="payload.kab" placeholder="Input here..." />
								<span v-for="error in v$.kab.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
					</form>
				</div>
			</template>
			<template v-slot:footer>
				<BaseButtonVue @clickEvent="showHideModal" class="btn-danger rounded px-4">Cancel</BaseButtonVue>
				<BaseButtonVue @clickEvent="upsertClient" class="btn-primary rounded px-4 ms-2">Proses</BaseButtonVue>
			</template>
		</BaseModalVue>
	</div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, numeric } from '@vuelidate/validators'
import ClientApi from '../utils/ClientApi'
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
const clientList = ref([])
const meta = reactive({
	limit: 10,
	page: 1,
	pageOf: 10,
	total: 10
})

const getClientList = () => {
	ClientApi.getList(meta.limit, meta.page)
		.then((res) => {
			let item = res.data

			clientList.value = item.data

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
	status: '',
	nama: '',
	marga: '',
	tempat_lahir: '',
	tgl_lahir: '',
	agama: '',
	pendidikan: '',
	pekerjaan: '',
	alamat: '',
	kel: '',
	kec: '',
	kab: '',
})

const myRegex = helpers.regex(/^[\w\s\d-]+$/d)

const rules = computed(() => {
	return {
		status: {
			required,
			maxLength: maxLength(20),
		},
		nama: {
			required,
			maxLength: maxLength(50),
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
		marga: {
			required,
			maxLength: maxLength(50),
		},
		tempat_lahir: {
			required,
			maxLength: maxLength(150)
		},
		tgl_lahir: { required },
		agama: {
			required,
			maxLength: maxLength(15)
		},
		pendidikan: {
			required,
			maxLength: maxLength(15)
		},
		pekerjaan: {
			required,
			maxLength: maxLength(25)
		},
		alamat: {
			required
		},
		kel: {
			required,
			maxLength: maxLength(25)
		},
		kec: {
			required,
			maxLength: maxLength(25)
		},
		kab: {
			required,
			maxLength: maxLength(25)
		}
	}
})
const v$ = useVuelidate(rules, payload)

const upsertClient = async () => {
	let validation = await v$.value.$validate()
	if (validation) {
		ClientApi.upsert(payload)
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
const editClient = (params) => {
	for (const key in params.dataRows) {
		payload[key] = params.dataRows[key]
	}
	showHideModal()
}

// ##########################################################
// Delete data config
const deleteClient = (params) => {
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
				ClientApi.delete(params.dataId)
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
		getClientList()
	}
})

const search = ref('')

const searchField = computed(() => {
	return clientList.value.filter((obj) => {
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
	getClientList()
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

const disStatusOptions = [
	{ value: 'penggugat', label: 'Penggugat' },
	{ value: 'tergugat', label: 'Tergugat' },
]

const diStatus = {
	value: 'value',
	label: 'label'
}

const disAgamaOptions = [
	{ value: 'islam', label: 'Islam' },
	{ value: 'kristen', label: 'Kristen' },
	{ value: 'protestan', label: 'Protestan' },
	{ value: 'hindu', label: 'Hindu' },
	{ value: 'budha', label: 'Budha' },
]

const diAgama = {
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
				getClientList()
				clearInput()
			}
		})
}

onMounted(() => {
	getClientList()
	myModal.value = new Modal('#myModal', {
		keyboard: false
	})
})
</script>