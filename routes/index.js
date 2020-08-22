const router = require('koa-router')()

const { exec } = require('child_process');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.post('/github',async (ctx,next) =>{
  let postParam = ctx.request.body
  console.log(postParam);
  ctx.body = {
    title: postParam
  }
  const yourscript = exec('bash ./routes/ex.sh',
      (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
      });
  console.log(yourscript);
  next()
})


module.exports = router
