/*
 * @Author: 邱狮杰
 * @Date: 2023-01-08 12:12:45
 * @LastEditTime: 2023-01-09 17:08:35
 * @Description:
 * @FilePath: /memo/packages/serverTest/server.ts
 */

import express from 'express'

const app = express()

app.get('/hello', (req, res) => {
  console.log('/hello log')
  return res.json(req.query.data || '缺少data参数')
})

app.get('/v1/hello', (_, res) => {
  console.log('/v1/hello log')
  return res.json('/v1/hello')
})

app.get('/timeout', (req, res) => {
  setTimeout(()=>{
  return res.json('timeout')
  }, Number(req.query.timeout || '1000'))
})



app.listen(3011, () => {
  console.log('run...')
})
