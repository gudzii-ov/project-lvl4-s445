import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import Pug from 'koa-pug';

export default () => {
  const app = new Koa();
  const router = new Router();

  app.use(
    serve(path.join(__dirname, '..', 'public')),
  );

  router.get('/', (ctx) => {
    ctx.render('index.pug');
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  const pug = new Pug({
    viewPath: path.join(__dirname, '..', 'views'),
  });

  pug.use(app);

  return app;
};
