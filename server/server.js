import Koa from 'koa';

export default () => {
  const app = new Koa();

  app.use(async (ctx) => {
    ctx.body = 'Welcome to task manager';
  });

  return app;
};
