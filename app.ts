import Koa, {BaseContext, Request} from 'koa'
const app = new Koa()

app.use( async ( ctx:BaseContext ) => {
    ctx.body = 'hello koa2'
});

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')