import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import Pug from 'koa-pug';
import koaWebpack from 'koa-webpack';

import webpackConfig from '../webpack.config';

export default () => {
  const app = new Koa();
  const router = new Router();

  const viewPath = path.join(__dirname, '..', 'views');
  console.log(viewPath);

  app.use(
    serve(path.join(__dirname, '..', 'public')),
  );

  if (process.env.NODE_ENV !== 'production') {
    koaWebpack({
      config: webpackConfig[0],
    }).then((m) => app.use(m));
  }

  router.get('root', '/', (ctx) => {
    ctx.render('welcome/index');
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  const pug = new Pug({
    viewPath,
    noCache: process.env.NODE_ENV === 'development',
    basedir: viewPath,
  });

  pug.use(app);

  return app;
};
