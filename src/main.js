import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from './store/index.js'
import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseBadge from './components/UI/BaseBadge.vue'
import BaseSpinner from './components/UI/BaseSpinner.vue'
// import BaseDialogue from './components/UI/BaseDialogue.vue'

const BaseDialogue = defineAsyncComponent(()=>import('./components/UI/BaseDialogue.vue'))


const app = createApp(App);
app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.component('base-dialogue', BaseDialogue)
app.use(router);
app.use(store)
app.mount("#app");
