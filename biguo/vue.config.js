
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '',
    productionSourceMap: false,
    runtimeCompiler: true,
    devServer: {
        //host: '0.0.0.0',
        //port: 8080,
        proxy: {
            "/product": {
                target: "https://m.doujinfq.com",
                    changeOrigin: true,
                pathRewrite: {
                    '^/product': '/'
                }
            }
        }
    }
}
