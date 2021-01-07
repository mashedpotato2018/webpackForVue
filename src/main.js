/*
 * @Author: your name
 * @Date: 2020-12-15 21:45:20
 * @LastEditTime: 2021-01-07 22:06:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-app-base\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'

import './style.less'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
