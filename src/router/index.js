import Vue from "vue";
import VueRouter from "vue-router";

// 导入 HomeView 页面组件
// import 接受的名字 from 路径
import HomeView from "../views/HomeView.vue"; 

// 导入 DetalisView 页面组件
// import 接受的名字 from 路径
import DetalisView from "../views/DetalisView.vue"; 


// 导入 CateView 页面组件
// import 接受的名字 from 路径
import CateView from "../views/CateView.vue"; 





// 导入 HomeView 页面组件

Vue.use(VueRouter);

// 路由配置项
const routes = [
    // 一条路由
    {
        path: "/", // 路由对应路径
        name: "home", // 路由路径
        component: HomeView, // 路由对应的页面
    },
     // 详情页面
     {
        path: "/detalis/:detaid", // 路由对应路径
        props:true,
        name: "detalis", // 路由路径
        component: DetalisView, // 路由对应的页面
    },
     // 购物车页面
     {
        path: "/cate/:cateid", // 路由对应路径
        props:true,
        name: "cate", // 路由路径
        component: CateView, // 路由对应的页面
    },
   
];

const router = new VueRouter({
    // history
    mode: "hash", // mode 模式  
    base: process.env.BASE_URL,
    routes,
});

// 默认导出路由
export default router;
