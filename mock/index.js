const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router(); 
app.use(bodyParser())
router.post('/api/login', async (ctx, next) => {
  let name = ctx.request.body.username;
  ctx.response.body = {
    code: 1,
    message: '登录成功',
    data: {
      token: name == 'admin'?'000000':'999999'
    }
  };
});
router.post('/api/logout', async (ctx, next) => {
  ctx.response.body = {
    code: 1,
    message: '登出成功',
    data: {}
  };
});
router.post('/api/userInfo', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let menus = require('../src/config/menu');
  ctx.response.body = {
    code: 1,
    message: '获取用户信息成功',
    data: {
      id: 0,
      name: 'admin',
      menus: token == '000000'?menus:[menus[0]]
    }
  };
});
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});
app.use(router.routes());
const port = 3333;
app.listen(port, () => {
  console.log('This server is running at http://localhost:' + port)
})