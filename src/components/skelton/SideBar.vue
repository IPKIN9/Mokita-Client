<template>
    <div id="sidebar" class="active">
        <div class="sidebar-wrapper active">
            <div class="sidebar-header">
                <div class="d-flex justify-content-beetwen">
                    <div class="logo">
                        <a href="#"><img :src="logo" alt="Logo" srcset="" style="height: 50px; width: auto;"></a>
                    </div>
                    <div class="toggler">
                        <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                    </div>
                </div>
            </div>
            <div class="sidebar-menu">
                <ul class="menu">
                    <li class="sidebar-title">Menu</li>

                    <li :class="$route.name === 'dashboard' ? 'sidebar-item active' : 'sidebar-item'">
                        <BaseLinkVue label="Dashboard" :to="{ name: 'dashboard' }" class='sidebar-link'
                            icon="bi bi-grid-fill" />
                    </li>

                    <li v-if="crudList" :class="$route.name === 'hakim' ? 'sidebar-item active' : 'sidebar-item'">
                        <BaseLinkVue label="Hakim" :to="{ name: 'hakim' }" class='sidebar-link'
                            icon="bi bi-person-circle" />
                    </li>

                    <li v-if="crudList" :class="$route.name === 'client' ? 'sidebar-item active' : 'sidebar-item'">
                        <BaseLinkVue label="Client" :to="{ name: 'client' }" class='sidebar-link'
                            icon="bi bi-people-fill" />
                    </li>

                    <li v-if="crudList" :class="$route.name === 'gugatan' || $route.name === 'anak' ? 'sidebar-item active' : 'sidebar-item'">
                        <BaseLinkVue label="Gugatan" :to="{ name: 'gugatan' }" class='sidebar-link'
                            icon="bi bi-file-earmark-text-fill" />
                    </li>

                    <li :class="$route.name === 'sidang' ? 'sidebar-item active' : 'sidebar-item'">
                        <BaseLinkVue label="Jadwal Sidang" :to="{ name: 'sidang' }" class='sidebar-link'
                            icon="bi bi-calendar-date" />
                    </li>

                    <li :class="$route.name === 'perkara' ? 'sidebar-item active' : 'sidebar-item'">
                        <BaseLinkVue label="Perkara" :to="{ name: 'perkara' }" class='sidebar-link'
                            icon="bi bi-file-earmark-person-fill" />
                    </li>

                    <li class="sidebar-item d-flex justify-content-center">
                        <BaseButton @clickEvent="goToLogin" class='sidebar-link fw-bold'><i class="bi bi-power me-3"></i> Logout</BaseButton>
                    </li>
                </ul>
            </div>
            <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import BaseLinkVue from '../button/BaseLink.vue'
import AuthCheck from '../../utils/AuthCheck'
import BaseButton from '../button/BaseButton.vue'
import { useRouter } from 'vue-router'
import SweetAlert from '../../utils/SweetAlert'
import logo from '../../assets/images/logo/logo.png'

const router = useRouter()
const crudList = ref(true)

const checkRole = () => {
    let role = AuthCheck.rolesCheck()
    if (role === 'crud-list') {
        crudList.value = true
    } else if (role === 'see-list') {
        crudList.value = false
    }
}

const goToLogin = () => {
    SweetAlert.alertConfirm({
        title: 'Logout',
        confirmtext: 'Logout'
    }).then((res) => {
        if (res.isConfirmed) {
            localStorage.removeItem('user')
            localStorage.removeItem('roles')
            router.replace('/login')
        }
    })
}

onBeforeMount(() => {
    checkRole()
})

</script>

<script>
export default {
    mounted() {
        function slideToggle(t, e, o) { 0 === t.clientHeight ? j(t, e, o, !0) : j(t, e, o); }
        function slideUp(t, e, o) { j(t, e, o); }
        function slideDown(t, e, o) { j(t, e, o, !0); }
        function j(t, e, o, i) { void 0 === e && (e = 400), void 0 === i && (i = !1), t.style.overflow = "hidden", i && (t.style.display = "block"); var p, l = window.getComputedStyle(t), n = parseFloat(l.getPropertyValue("height")), a = parseFloat(l.getPropertyValue("padding-top")), s = parseFloat(l.getPropertyValue("padding-bottom")), r = parseFloat(l.getPropertyValue("margin-top")), d = parseFloat(l.getPropertyValue("margin-bottom")), g = n / e, y = a / e, m = s / e, u = r / e, h = d / e; window.requestAnimationFrame(function l(x) { void 0 === p && (p = x); var f = x - p; i ? (t.style.height = g * f + "px", t.style.paddingTop = y * f + "px", t.style.paddingBottom = m * f + "px", t.style.marginTop = u * f + "px", t.style.marginBottom = h * f + "px") : (t.style.height = n - g * f + "px", t.style.paddingTop = a - y * f + "px", t.style.paddingBottom = s - m * f + "px", t.style.marginTop = r - u * f + "px", t.style.marginBottom = d - h * f + "px"), f >= e ? (t.style.height = "", t.style.paddingTop = "", t.style.paddingBottom = "", t.style.marginTop = "", t.style.marginBottom = "", t.style.overflow = "", i || (t.style.display = "none"), "function" == typeof o && o()) : window.requestAnimationFrame(l); }); }
        let sidebarItems = document.querySelectorAll(".sidebar-item.has-sub");
        for (var i = 0; i < sidebarItems.length; i++) {
            let sidebarItem = sidebarItems[i];
            sidebarItems[i].querySelector(".sidebar-link").addEventListener("click", function (e) {
                e.preventDefault();
                let submenu = sidebarItem.querySelector(".submenu");
                if (submenu.classList.contains("active"))
                    submenu.style.display = "block";
                if (submenu.style.display == "none")
                    submenu.classList.add("active");
                else
                    submenu.classList.remove("active");
                slideToggle(submenu, 300);
            });
        }
        window.addEventListener("DOMContentLoaded", (event) => {
            var w = window.innerWidth;
            if (w < 1200) {
                document.getElementById("sidebar").classList.remove("active");
            }
        });
        window.addEventListener("resize", (event) => {
            var w = window.innerWidth;
            if (w < 1200) {
                document.getElementById("sidebar").classList.remove("active");
            }
            else {
                document.getElementById("sidebar").classList.add("active");
            }
        });
        document.querySelector(".burger-btn").addEventListener("click", () => {
            document.getElementById("sidebar").classList.toggle("active");
        });
        document.querySelector(".sidebar-hide").addEventListener("click", () => {
            document.getElementById("sidebar").classList.toggle("active");
        });
        // Perfect Scrollbar Init
        if (typeof PerfectScrollbar == "function") {
            const container = document.querySelector(".sidebar-wrapper");
            const ps = new PerfectScrollbar(container, {
                wheelPropagation: false
            });
        }
        // Scroll into active sidebar
        document.querySelector(".sidebar-item.active").scrollIntoView(false);
    },
    components: { BaseButton }
}
</script>