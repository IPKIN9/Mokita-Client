<template>
  <div id="main">
    <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
            <i class="bi bi-justify fs-3"></i>
        </a>
    </header>
    <SideBarVue/>
    <div class="page-heading">
        <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Welcome sir</h3>
                    <p class="text-subtitle text-muted">Dashboard panel </p>
                </div>
            </div>
        </div>
        <section class="section">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Default Layout</h4>
                </div>
                <div class="card-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, commodi? Ullam quaerat
                    similique iusto
                    temporibus, vero aliquam praesentium, odit deserunt eaque nihil saepe hic deleniti? Placeat
                    delectus
                    quibusdam ratione ullam!
                </div>
            </div>
        </section>
    </div>
    <FooterVue/>
  </div>
</template>
<script setup>
  import SideBarVue from '../components/skelton/SideBar.vue'
  import FooterVue from '../components/skelton/Footer.vue'
</script>