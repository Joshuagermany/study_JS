const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      //I should try this in my own computer -> target: http://localhost:5000'
      //target: http://localhost:5000'
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};