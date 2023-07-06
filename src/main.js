import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/reset.css";
import "./assets/global.css";
import DefaultBtn from "@/components/DefaultBtn.vue";

app.component("DefaultBtn", DefaultBtn);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
