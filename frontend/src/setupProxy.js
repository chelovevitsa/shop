const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use([
    '/api/shop/login',
    '/api/shop/product/add',
    '/api/shop/products',
    ],
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};