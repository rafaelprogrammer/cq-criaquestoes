// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://cq-criaquestoes.herokuapp.com'
} else {
  axios.defaults.baseURL = 'http://localhost:8080'
}

axios.defaults.headers.common['SELVA'] = 'SELVAAAA'

Vue.use(Vuetify)

Vue.config.productionTip = false

axios.interceptors.request.use(function (config) {
  if (!localStorage.getItem('x-auth-token')) {
    router.push({name: 'Login'})
  }
  config.headers['x-auth-token'] = localStorage.getItem('x-auth-token')
  return config
}, function (error) {
  return Promise.reject(error)
})

router.beforeEach(function (route, redirect, next) {
  console.log(route)
  if (!localStorage.getItem('x-auth-token') && route.name !== 'Login') {
    router.push({name: 'Login'})
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
