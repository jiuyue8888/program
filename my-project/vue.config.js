
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '',
    productionSourceMap: false,
    runtimeCompiler: true,
    devServer: {
        //host: '0.0.0.0',
        //port: 8080,
        proxy: {

            "/api/v1": {
                target: "http://47.114.141.209:8085",
                    changeOrigin: true,
                    pathRewrite: {
                    '^/api/v1': '/api/v1'
                }

            },
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
