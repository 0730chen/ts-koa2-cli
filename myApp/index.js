"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const start = +new Date();
    yield next();
    const ms = +new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));
// routes
app.use(index.routes());
app.use(users.routes());
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});
module.exports = app;
