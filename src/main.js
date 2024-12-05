import { createApp, h } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import Vue3Toastify from "vue3-toastify";

import "./index.css";
// import "ant-design-vue/dist/reset.css";
import router from "./router/index.js";

const app = createApp({
  render() {
    return h(App);
  },
});
app.use(Antd);
app.use(Vue3Toastify, { autoClose: 3000 });
app.use(router);
app.mount("#app");
