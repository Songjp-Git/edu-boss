/* eslint-disable */
const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()
const port = 5000

app.use(express.static(path.join(__dirname, '../dist')))

app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  // // 设置请求头中的 host 为 target，防止后端反向代理服务器无法识别
  changeOrigin: true
}));

app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})