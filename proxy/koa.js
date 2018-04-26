const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const request = require('co-request')

const URI = 'https://api.douban.com/v2'
router.prefix('/douban')
router.get(['/:type', '/:type/:id'], async ctx => {
  let result
  try {
    let url = ctx.url.replace(/\/douban(\w*)/, URI + '$1')
    console.log(':::', url, ':::')
    result = await request({uri: url, method: ctx.method}) // 返回的是字符串
  } catch (error) {
    throw new Error(error)
  } finally {
    ctx.body = JSON.parse(result.body)
  }
})

app.use(router.routes(), router.allowedMethods())

app.listen(3001, () => {
  console.log(`Proxy Server started on 3001`)
})
