import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/";     // it automatically imports index.js, when you go to the folder name     // router je const v index.js¸!!
import store from './store'
import "@/assets/global.css";


createApp(App).use(store).use(router).mount("#app");
