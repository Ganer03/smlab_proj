import './assets/main.css';
import "primeflex/primeflex.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primeicons/primeicons.css";
// import "primeicons/primeicons.css";
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import PrimeVue from "primevue/config";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
