import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import registerIcons from './global/register-icons'




/* app.use(pinia)
const LoginStore = useLoginStore()
LoginStore.loadLocalCacheAction() */
app.use(registerStore)


app.use(router)
app.mount('#app')
