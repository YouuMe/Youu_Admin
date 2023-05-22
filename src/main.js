import { createApp } from 'vue'
/** 重置样式 这里引入自定义的重置样式也可 */
// import '@unocss/reset/tailwind.css'
import '@/styles/index.scss'
import 'uno.css'
import App from './App.vue'

createApp(App).mount('#app')
