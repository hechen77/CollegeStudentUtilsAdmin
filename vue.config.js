const {defineConfig} = require('@vue/cli-service')
module.exports = {
    transpileDependencies: true, chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
            args[0].title = "管理系统";
            return args;
        });
    },
    devServer: {
        proxy: {
            "/": {
                target: "http://localhost:1888",
                changerOrigin: true,
                ws: false
            }
        }
    }
}
