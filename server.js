import Koa from 'koa';

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Welcome to task manager';
});

app.listen(3000, () => {
  console.log('Server started.\n');
});
