import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

Vue.use(VueFormWizard)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
Vue.component('v-icon', Icon)