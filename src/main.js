import Vue from 'vue'
import App from './App'
import store from './store'

import '@/common/css/font-awesome.min.css'
import '@/common/css/font-bin.min.css'
import '@/common/css/weui.css'

// 创建fly实例
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
// 全局配置
fly.config.baseURL = 'http://localhost:3001/douban/'
// 添加拦截器
fly.interceptors.request.use((config, promise) => {
  // 给所有请求头添加自定义headers
  config.headers['X-Tag'] = 'flyio'
  return config
})

// 将fly实例挂载vue原型上
Vue.prototype.$http = fly

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/profile/main', 'pages/index/main'],
    window: {
      navigationBarTextStyle: 'white',
      navigationBarBackgroundColor: '#11cd6e'
    },
    tabBar: {
      'color': '#a9b7b7',
      'selectedColor': '#11cd6e',
      'borderStyle': 'white',
      'list': [{
        'selectedIconPath': '/static/images/ic_tab_home_active.png',
        'iconPath': '/static/images/ic_tab_home_normal.png',
        'pagePath': 'pages/index/main',
        'text': '电影'
      }, {
        'selectedIconPath': '/static/images/ic_tab_profile_active.png',
        'iconPath': '/static/images/ic_tab_profile_normal.png',
        'pagePath': 'pages/profile/main',
        'text': '我的'
      }]
    },
    debug: true
  }
}
