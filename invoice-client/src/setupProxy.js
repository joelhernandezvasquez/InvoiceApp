const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
 /*  app.use(
    ["/api/*","/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  ); */

  app.use(createProxyMiddleware('/api/**',{target:'http://localhost:5000'}))
  app.use(createProxyMiddleware('/auth/google',{target:'http://localhost:5000'}))
  app.use(createProxyMiddleware('/api/login/user',{target:'http://localhost:5000'}))
  app.use(createProxyMiddleware('/api/existing_user',{target:'http://localhost:5000'}))
  app.use(createProxyMiddleware('/api/users',{target:'http://localhost:5000'}))
  app.use(createProxyMiddleware('/api/update_user',{target:'http://localhost:5000'}))
  app.use(createProxyMiddleware('/api/customers',{target:'http://localhost:5000'}))

  
};