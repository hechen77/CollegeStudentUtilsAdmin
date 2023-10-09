import {adminGetNavListAPI} from "@/utils/http";

export default {
    namespaced: "userInfo",
    state: {
        userInfo: null,
        userRoles: null,
        navList: [],
    },
    mutations: {
        SET_USERINFO(state, content) {
            state.userInfo = content
        },
        SET_NAVLIST(state, content) {
            state.navList = content
        }
    },
    actions: {
        async GET_USERINFO({commit}, localInfo) {
            commit('SET_USERINFO', localInfo)
        },
        async GET_NAVLIST({commit}, identity) {
            const data = await adminGetNavListAPI(identity);
            if (data && data.success) {
                commit('SET_NAVLIST', data.data)
            }
        }
    },
    getters: {
        headerUserInfoGetter(state) {
            return !state.userInfo ? state.userInfo : {
                userName: state.userInfo.userName,
                jobNumber: state.userInfo.jobNumber,
            }
        },
        getNavList(state) {
            return state.navList;
        }
    }
}