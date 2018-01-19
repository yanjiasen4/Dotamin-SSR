import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

// 我们用两个变量保留 nuxt 和 server 实例的引用
// 这样可以在单元测试结束之后关掉它们
let nuxt = null

const testMatchId = '3677064911'

// 初始化 Nuxt.js 并创建一个监听 localhost:4000 的服务器
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // 项目目录
  config.dev = false // 生产构建模式
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// 测试生成的html
test('路由 / 有效且能渲染 HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute(`/match/${testMatchId}`, context)
  t.true(html.includes('<div class="match-wrapper"'))
})

// 测试元素的有效性
test('match/:id 路由 / 有效且渲染的HTML有特定的CSS样式', async t => {
  const window = await nuxt.renderAndGetWindow(`http://localhost:4000/match/${testMatchId}`)
  const element = window.document.querySelector('.score')
  t.not(element, null)
  t.not(element.textContent, null)
  t.is(element.className, 'radiant score')
})

// 关掉服务器和Nuxt实例，停止文件监听。
test.after('Closing server and nuxt.js', t => {
  nuxt.close()
})