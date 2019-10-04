import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase";
import VueFire from 'vuefire';
import 'firebase/firestore';

Vue.config.productionTip = false
Vue.use(VueFire)

//Firebase config
var config = {
    
};
firebase.initializeApp(config);

const db = firebase.firestore()
const settings = {timestampsInSnapshots : true};
db.settings(settings);

new Vue({
  router,
  store,
  provide: {
      db
  },
  render: h => h(App)
}).$mount('#app')
