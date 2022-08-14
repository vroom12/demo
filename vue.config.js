const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    // 打包资源路径
    publicPath: "./",
    // 启动配置
    devServer: {
        open: true,
        host: "localhost",
    },
});
