import Vue from 'vue'
import VueRouter from 'vue-router'
import userLogin from "../views/userLogin"
import {localStorage, webTitle} from "@/utils/config";
import layout from "@/Layout/Layout";
import consolePage from "@/views/consolePage";
import {tokenVerifyAPI} from "@/utils/http";
import navListController from "@/views/course/courseManage.vue";
import courseManage from "@/views/course/courseManage.vue";
import Layout from "@/Layout/Layout.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: "/login",
        name: "userLogin",
        components: {
            default: userLogin
        },
        meta: {title: "登录"}
    },
    {
        path: "/",
        components: {
            default: layout
        },
        children: [
            {
                path: "",
                name: "consolePage",
                components: {
                    main: consolePage
                },
                meta: {title: "控制台"}
            }
        ]
    },
    {
        path: "/course",
        components: {
            default: Layout
        },
        meta: {title: "课程管理"},
        children: [
            {
                path: "list",
                components: {
                    default: Layout,
                    main: courseManage
                },
                meta: {title: "课程列表"}
            },
            {
                path: "series/manage",
                components: {
                    default: Layout,
                    main: navListController
                },
                meta: {title: "系列管理"}
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async (to, from, next) => {
    if (to.path == "/login") {
        if (localStorage.get("CollegeStudentUtilsLoginToken") && localStorage.get("CSU")) {
            const data = await tokenVerifyAPI();
            next("/")
        } else {
            localStorage.remove("CSU") ?? localStorage.remove("CollegeStudentUtilsLoginToken")
            next()
        }
    } else {
        if (localStorage.get("CollegeStudentUtilsLoginToken") && localStorage.get("CSU")) {
            const data = await tokenVerifyAPI();
            next()
        } else {
            localStorage.remove("CSU") ?? localStorage.remove("CollegeStudentUtilsLoginToken")
            next("/login")
        }
    }
})

router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title + "-" + webTitle
    } else {
        document.title = webTitle
    }
})
//  解决路由重复报错的问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch((error) => error)
}

const routerReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    routerReplace.call(this, location).catch((error) => error)
}


export default router