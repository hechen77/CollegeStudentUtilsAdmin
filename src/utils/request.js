import axios from "axios";
import {localStorage} from "@/utils/config";
import {Loading, Message, MessageBox} from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
    showSpinner: false
})

const request = axios.create({
    baseURL: `/`,
    timeout: 10000,
})
var loadingInstance;
request.interceptors.request.use(config => {
    if (localStorage.get("CollegeStudentUtilsLoginToken")) {
        config.headers["CollegeStudentUtilsLoginToken"] = localStorage.get('CollegeStudentUtilsLoginToken');
    }
    NProgress.start();
    loadingInstance = Loading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'loading-class'
    })
    return config;
})

request.interceptors.response.use(response => {
    const res = response.data;
    NProgress.done();
    loadingInstance.close();
    if (res.code === 808) {
        MessageBox.confirm(res.message, "提示信息", {
            confirmButtonText: "重新登陆",
            type: "warning",
            showCancelButton: false,
            distinguishCancelAndClose: true,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            closeOnHashChange: false

        }).then(() => {
            localStorage.remove("CollegeStudentUtilsLoginToken")
            localStorage.remove("CSU")
            location.href = location.href + "login";
        });
        return;
    }
    if (res.success !== true) {
        Message({
            message: response.config.method + ":" + response.config.baseURL + response.config.url + "  " + res.message,
            type: "error"
        })
    }
    return res;
}, error => {
    NProgress.done();
    loadingInstance.close();
    console.error(error);
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
})
export default request;