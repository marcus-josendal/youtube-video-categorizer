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
    apiKey: "AIzaSyAnBEEgGG4yCa8x_me_8gV2HD8-dk2oBg8",
    authDomain: "vuetube-dedc1.firebaseapp.com",
    databaseURL: "https://vuetube-dedc1.firebaseio.com",
    projectId: "vuetube-dedc1",
    storageBucket: "vuetube-dedc1.appspot.com",
    messagingSenderId: "531948754653"
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
