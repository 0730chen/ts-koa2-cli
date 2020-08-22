"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const app = new koa_1.default();
const views = require('koa-views');
const json = require('koa-json');
const onError = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const index = require('./routes/index');
const users = require('./routes/users');
const port = process.argv[2]; //指定端口
if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？');
    process.exit(1);
}
// error handler
onError(app);
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));
// logger
// app.use(async (ctx:Koa.Context, next:Koa.Next) => {
//     const start = +new Date()
//     await next()
//     const ms = +new Date() as number - start as number
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })
// routes
app.use(index.routes());
app.use(users.routes());
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});
app.listen(port, () => {
    console.log('服务启动成功');
});
