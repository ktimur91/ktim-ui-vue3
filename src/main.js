import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// NPM
import vClickOutside from 'click-outside-vue3'

// SCSS
import 'ktim-scss'
import '@/assets/scss/themes.css'
import '@/assets/scss/main.scss'
import '@/assets/scss/modules/forms.scss'
import '@/assets/scss/modules/btns.scss'

createApp(App).use(store).use(router).use(vClickOutside).mount('#app')
