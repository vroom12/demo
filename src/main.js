import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 导入清除默认样式
import "./assets/reset.css"
Vue.config.productionTip = false;

import Vant from "vant"; // 全局引入vant
import "vant/lib/index.css"; // 全局引入vant.css
Vue.use(Vant); // 将vant作为插件插入vue

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
