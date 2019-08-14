import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import Pug from 'koa-pug';

export default () => {
  const app = new Koa();
  const router = new Router();

  const publicPath = path.resolve(__dirname, '..', 'public');
  const viewPath = path.resolve(__dirname, '..', 'views');

  console.log(`Static files path: ${publicPath}`);
  console.log(`Views path (pug): ${viewPath}`);

  app.use(
    serve(publicPath),
  );

  router.get('/', (ctx) => {
    ctx.render('index.pug');
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  const pug = new Pug({
    viewPath,
  });

  pug.use(app);

  return app;
};
