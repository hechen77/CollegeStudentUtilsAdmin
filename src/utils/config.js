const dev = true
const server = {
    local: "http://localhost:1888",
    network: "https://api.csu.hc8.ren"
}
export const baseUrl = dev ? server.local : server.network;

export const localStorage = {
    set(key, value) {
        window.localStorage.setItem(key, value);
    },
    get(key) {
        return window.localStorage.getItem(key);
    },
    remove(key) {
        window.localStorage.removeItem(key);
    }
}

export const webTitle = "冀霸管理系统"
