import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import VueCompositionAPI from "@vue/composition-api";

Vue.use(VueCompositionAPI);
const pinia = createPinia();
Vue.use(PiniaVuePlugin);
Vue.use(pinia);
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

import { CHECK_AUTH } from "./store/actions.type";
import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";
import "./assets/tailwind.css";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);

ApiService.init();

import { authStore } from "@/store/auth.module";
// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) => {
  const auth_store = authStore();
  Promise.all([auth_store[CHECK_AUTH]()]).then(next);
});

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount("#app");
