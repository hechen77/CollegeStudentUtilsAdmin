import request from '@/utils/request'
// export const 方法名 = (携带参数) => request({url:"接口地址",method:"GET/POST",params:{如果请求方式为GET时使用params携带参数},data:{当请求方式为POST时使用data携带参数}})

export const tokenVerifyAPI = () => request({
    url: "/tokenVerify"
})

export const adminUserLoginAPI = (data) => request({
    url: "/adminUser/login",
    method: "POST",
    data: {userPhone: data.userPhone, password: data.password}
})

export const adminUserInfoByUidAPI = (userPhone) => request({
    url: `/adminUser/info/${userPhone}`,
    method: "POST"
})


export const adminGetNavListAPI = (identity) => request({
    url: `/adminNavList?role=${identity}`,
    method: "GET"
})

export const adminGerCourseListAPI = () => request({
    url: "",
    method: ""
})