const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ask',
    createProxyMiddleware({
      target: 'https://bhagavad-gita-qa-669294246288.us-central1.run.app',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/ask': '/ask' },
      onProxyReq: (proxyReq, req, res) => {
        // Ensure proper headers if needed
        proxyReq.setHeader('Referer', 'http://localhost:3000/');
      },
    })
  );
};
