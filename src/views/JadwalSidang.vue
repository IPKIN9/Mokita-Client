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
						<h3>Jadwal Sidang</h3>
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
										<td style="width: 30%;">Keterangan</td>
										<th>Sidang Dimulai</th>
										<th>Sidang Berakhir</th>
										<th style="width: 16%;">aksi</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(sidang, index) in searchField" :key="index">
										<td>{{index + 1}}</td>
										<td>{{sidang.ket}}</td>
										<td>{{moment(sidang.tgl_waktu_mulai).format('DD MMMM, YYYY | h:mm:ss a')}}</td>
										<td>{{moment(sidang.tgl_waktu_berakhir).format('DD MMMM, YYYY | h:mm:ss a')}}</td>
										<td>
											<BaseButtonVue @clickEvent="editJadwal" class="btn-outline-primary btn-sm rounded"
												:dataRows="searchField[index]">EDIT
											</BaseButtonVue>
											<BaseButtonVue class="btn-outline-danger btn-sm rounded ms-2" @clickEvent="deleteJadwal"
												:dataId="sidang.id">HAPUS
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
		<BaseModalVue mdSize="" idModal="myModal" mdTitle="Insert or update data">
			<template v-slot:body>
				<div class="modal-body">
					<form class="pt-2" style="padding-bottom: 56px;">
						<div class="col-lg-12">
							<div class="form-group">
								<label for="">Tanggal Waktu Sidang Dimulai</label>
								<DateTimePickerVue v-model="payload.tgl_waktu_mulai" />
								<span v-for="error in v$.tgl_waktu_mulai.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-12">
							<div class="form-group">
								<label for="">Tanggal Waktu Sidang Berakhir</label>
								<DateTimePickerVue v-model="payload.tgl_waktu_berakhir" />
								<span v-for="error in v$.tgl_waktu_berakhir.$errors" :key="error.$uid">
									<small class="text-danger">field {{ error.$message }}.</small>
								</span>
							</div>
						</div>
						<div class="col-lg-12 mt-3 mb-3">
							<BaseTextAreaVue v-model="payload.ket" label="Keterangan" />
							<span v-for="error in v$.ket.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
					</form>
				</div>
			</template>
			<template v-slot:footer>
				<BaseButtonVue @clickEvent="showHideModal" class="btn-danger rounded px-4">Cancel</BaseButtonVue>
				<BaseButtonVue @clickEvent="upsertJadwal" class="btn-primary rounded px-4 ms-2">Proses</BaseButtonVue>
			</template>
		</BaseModalVue>
	</div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import JadwalApi from '../utils/JadwalApi'
import Modal from 'bootstrap/js/dist/modal'
import SideBarVue from '../components/skelton/SideBar.vue'
import FooterVue from '../components/skelton/Footer.vue'
import BaseSelectVue from '../components/input/BaseSelect.vue'
import BaseInputVue from '../components/input/BaseInput.vue'
import DateTimePickerVue from '../components/input/DateTimePicker.vue'
import BaseButtonVue from '../components/button/BaseButton.vue'
import PaginationVue from '../components/Pagination.vue'
import BaseModalVue from '../components/BaseModal.vue'
import BaseTextAreaVue from '../components/input/BaseTextArea.vue'
import SweetAlert from '../utils/SweetAlert'
import moment from 'moment'

// ##########################################################
// Get data config
const jadwalList = ref([])
const meta = reactive({
	limit: 10,
	page: 1,
	pageOf: 10,
	total: 10
})

const getJadwalList = () => {
	JadwalApi.getList(meta.limit, meta.page, '', '')
		.then((res) => {
			let item = res.data

			jadwalList.value = item.data

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
	tgl_waktu_mulai: '',
	tgl_waktu_berakhir: '',
	ket: 'No'
})

const rules = computed(() => {
	return {
		tgl_waktu_mulai: {
			required
		},
		tgl_waktu_berakhir: {
			required
		},
		ket: {
			required
		},
	}
})
const v$ = useVuelidate(rules, payload)

const upsertJadwal = async () => {
	let validation = await v$.value.$validate()
	payload.tgl_waktu_mulai = moment(payload.tgl_waktu_mulai).format('YYYY-MM-DDThh:mm:ss')
	payload.tgl_waktu_berakhir = moment(payload.tgl_waktu_berakhir).format('YYYY-MM-DDThh:mm:ss')
	if (validation) {
		JadwalApi.upsert(payload)
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
const editJadwal = (params) => {
	for (const key in params.dataRows) {
		payload[key] = params.dataRows[key]
	}
	showHideModal()
}

// ##########################################################
// Delete data config
const deleteJadwal = (params) => {
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
				JadwalApi.delete(params.dataId)
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
		getJadwalList()
	}
})

const search = ref('')

const searchField = computed(() => {
	return jadwalList.value.filter((obj) => {
		const computedObj = {
			...obj,
			ket: obj.ket,
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
	getJadwalList()
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
		payload[key] = ''
	}
	payload.ket = 'No'
	delete payload.id
}

const AlertSuccess = (options) => {
	SweetAlert.alertSuccess(options.text)
		.then((res) => {
			if (res.isConfirmed) {
				getJadwalList()
				clearInput()
			}
		})
}

onMounted(() => {
	getJadwalList()
	myModal.value = new Modal('#myModal', {
		keyboard: false
	})
})
</script>