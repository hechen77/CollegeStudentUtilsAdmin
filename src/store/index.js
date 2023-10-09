import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import userInfo from "@/store/modules/userInfo";

export default new Vuex.Store({
    modules: {
        userInfo
    }
})
