import Vue from 'vue'
import App from './CanvasApp.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

Vue.config.productionTip = false

import moment from 'moment';
import './plugins/element.js'

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
    }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
