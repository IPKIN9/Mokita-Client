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
                        <h3>Hakim</h3>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="container-fluid mt-3 row">
                        <div class="col-lg-1">
                            <BaseSelectVue v-model.number="meta.limit" :options="selectOptions"
                                :display="selectDisplay" />
                        </div>
                        <label class="col-lg-8 py-2">Data Tampil</label>
                        <BaseInputVue class="col" placeholder="Search..." />
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
                                    <tr class="text-uppercase">
                                        <td class="align-top">1.</td>
                                        <td class="align-top">
                                            <span class="text-bold-500">Irwandi Paputungan</span><br>
                                            <small>5520117043</small>
                                        </td>
                                        <td class="align-top">Lolak <br> 12-11-1999</td>
                                        <td class="align-top">Hakim ketua</td>
                                        <td class="align-top">
                                            <ul>
                                                <li>S1 Komputer</li>
                                                <li>S2 Komputer</li>
                                            </ul>
                                        </td>
                                        <td class="align-top">sertifikat</td>
                                        <td class="align-top">
                                            <BaseButtonVue class="btn-outline-primary btn-sm rounded">EDIT
                                            </BaseButtonVue>
                                            <BaseButtonVue class="btn-outline-danger btn-sm rounded ms-2">HAPUS
                                            </BaseButtonVue>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="container-fluid row">
                        <PaginationVue :limit="meta.limit" :page="meta.page" :pageOf="meta.pageOf"
                            :total="meta.total" />
                    </div>
                </div>
            </section>
        </div>
        <FooterVue />
    </div>
</template>
<script setup>
import SideBarVue from '../components/skelton/SideBar.vue'
import FooterVue from '../components/skelton/Footer.vue'
import BaseSelectVue from '../components/input/BaseSelect.vue'
import BaseInputVue from '../components/input/BaseInput.vue'
import BaseButtonVue from '../components/button/BaseButton.vue'
import PaginationVue from '../components/Pagination.vue'
import { reactive, ref } from 'vue';

// ##########################################################
// Get data config
const meta = reactive({
    limit: 10,
    page: 1,
    pageOf: 10,
    total: 50
})

// ##########################################################
// Extends funct
const selectOptions = [
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
]

const selectDisplay = {
    value: 'value',
    label: 'label'
}
</script>