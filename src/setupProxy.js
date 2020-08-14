const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8000/api',
      pathRewrite: {'^/api' : ''},
      changeOrigin: true,
    })
  );
  // app.use(
  //   '/api2',
  //   createProxyMiddleware({
  //     target: 'http://127.0.0.1:8000/api2',
  //     pathRewrite: {'^/api2' : ''},
  //     changeOrigin: true,
  //   })
  // );
};