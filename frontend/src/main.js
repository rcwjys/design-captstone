import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia).use(VueApexCharts).component('apexchart', VueApexCharts).mount('#app')
