import {BaseContext} from "koa";
import Koa from 'koa'
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onError = require('koa-onerror');
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onError(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx:Koa.Context, next:Koa.Next) => {
    const start = +new Date()
    await next()
    const ms = +new Date() as number - start as number
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes())
app.use(users.routes())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
