import Vue from 'vue'
import VueSelect from 'vue-select'
import App from './App.vue'
import router from './router'
import store from './store'
import SuiVue from 'semantic-ui-vue'
import VueApexCharts from 'vue-apexcharts'
import VueAnimateNumber from 'vue-animate-number'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 575,
    md: 768,
    lg: 968
  },
  defaultBreakpoint: 'viewport-width' // customize this for SSR
});

Vue.use(VueAnimateNumber);
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);
Vue.component('v-select', VueSelect);

import 'semantic-ui-css/semantic.css';
Vue.use(SuiVue);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

