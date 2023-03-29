import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

import CocoButton from '@/components/coco-button.vue'
app.component('coco-button', CocoButton)
app.use(ElementPlus)
app.mount('#app')
