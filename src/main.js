import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/reset.css";
import "./assets/global.css";
import DefaultBtn from "@/components/DefaultBtn.vue";
import ArticleLarge from "@/components/ArticleLarge.vue";

const pinia = createPinia();
const app = createApp(App);

app.component("DefaultBtn", DefaultBtn).component("ArticleLarge", ArticleLarge);

app.use(pinia).use(router).mount("#app");
