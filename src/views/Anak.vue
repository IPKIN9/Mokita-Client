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
						<h3>Anak</h3>
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
										<th style="width: 30%;">tempat/tgl lahir</th>
										<th style="width: 16%;">aksi</th>
									</tr>
								</thead>
								<tbody>
									<tr class="text-capitalize" v-for="(anak, index) in searchField" :key="index">
										<td>{{index + 1}}.</td>
										<td>{{anak.nama}}</td>
										<td>{{anak.tempat_lahir}}, {{moment(anak.tgl_lahir).format('DD MMMM, YYYY')}}</td>
										<td>
											<BaseButtonVue @clickEvent="editAnak" :dataRows="searchField[index]" class="btn-outline-primary btn-sm rounded">EDIT
											</BaseButtonVue>
											<BaseButtonVue @clickEvent="deleteAnak" :dataId="anak.id" class="btn-outline-danger btn-sm rounded ms-2">HAPUS
											</BaseButtonVue>
										</td>
									</tr>
								</tbody>
							</table>
							<div v-if="anakList.length < 1" class="d-flex justify-content-center p-5">
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
					<form class="pt-2 row" style="padding-bottom: 56px;">
						<div class="form-group">
							<label for="">Nama</label>
							<BaseInputVue v-model="payload.nama" placeholder="Input here..." />
							<span v-for="error in v$.nama.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
						<div class="form-group mt-3">
							<label for="">Tempat Lahir</label>
							<BaseInputVue v-model="payload.tempat_lahir" placeholder="Input here..." />
							<span v-for="error in v$.tempat_lahir.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
						<div class="form-group mt-3">
							<label for="">Tanggal Lahir</label>
							<BaseInputVue v-model="payload.tgl_lahir" placeholder="Input here..." typeOf="date" />
							<span v-for="error in v$.tgl_lahir.$errors" :key="error.$uid">
								<small class="text-danger">field {{ error.$message }}.</small>
							</span>
						</div>
					</form>
				</div>
			</template>
			<template v-slot:footer>
				<BaseButtonVue @clickEvent="showHideModal" class="btn-danger rounded px-4">Cancel</BaseButtonVue>
				<BaseButtonVue @clickEvent="upsertAnak" class="btn-primary rounded px-4 ms-2">Proses</BaseButtonVue>
			</template>
		</BaseModalVue>
	</div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, helpers } from '@vuelidate/validators'
import AnakApi from '../utils/AnakApi'
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
import { useRoute } from 'vue-router'

// ##########################################################
// Get data config
const anakList = ref([])
const meta = reactive({
	limit: 10,
	page: 1,
	pageOf: 10,
	total: 10
})

const getAnakList = () => {
	AnakApi.getList(payload.id_gugatan, meta.limit, meta.page)
		.then((res) => {
			let item = res.data

			anakList.value = item.data

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
const route = useRoute()

const payload = reactive({
	id_gugatan: parseInt(route.query.id_gugatan),
	nama: '',
	tempat_lahir: '',
	tgl_lahir: ''
})

const myRegex = helpers.regex(/^[\w\s\d-]+$/d)

const rules = computed(() => {
	return {
		nama: {
			required,
			maxLength: maxLength(100),
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
		tempat_lahir: {
			required,
			maxLength: maxLength(150),
		},
		tgl_lahir: {
			required
		},
	}
})
const v$ = useVuelidate(rules, payload)

const upsertAnak = async () => {
	let validation = await v$.value.$validate()
	if (validation) {
		AnakApi.upsert(payload)
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
const editAnak = (params) => {
	for (const key in params.dataRows) {
		if (key === 'id_gugatan') {
			continue
		}
		payload[key] = params.dataRows[key]
	}
	showHideModal()
}

// ##########################################################
// Delete data config
const deleteAnak = (params) => {
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
				AnakApi.delete(params.dataId)
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
		getAnakList()
	}
})

const search = ref('')

const searchField = computed(() => {
	return anakList.value.filter((obj) => {
		const computedObj = {
			...obj,
			nama: obj.nama,
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
	getAnakList()
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
		if (key === 'id_gugatan') {
			continue
		}
		payload[key] = ''
	}
	delete payload.id
}

const AlertSuccess = (options) => {
	SweetAlert.alertSuccess(options.text)
		.then((res) => {
			if (res.isConfirmed) {
				getAnakList()
				clearInput()
			}
		})
}

onMounted(() => {
	getAnakList()
	myModal.value = new Modal('#myModal', {
		keyboard: false
	})
})
</script>