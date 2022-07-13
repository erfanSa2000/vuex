import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from "vue3-cookies";
const Axios = axios.create({
  baseURL: "https://api-behbanex.gorgon.ir/api/",
});

const app = createApp(App);
app.config.globalProperties.$axios = Axios;

app.use(router).use(store);
app.use(VueAxios, axios);
app.use(VueCookies);
app.mount("#app");
import "bootstrap/dist/js/bootstrap.js";
