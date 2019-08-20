import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import Pug from 'koa-pug';
import session from 'koa-session';
import flash from 'koa-flash-simple';
import koaLogger from 'koa-logger';

import addRoutes from './routes';

export default () => {
  const app = new Koa();

  const viewPath = path.join(__dirname, '..', 'views');

  app.keys = ['some secret hurr'];
  app.use(session(app));
  app.use(flash());

  app.use(async (ctx, next) => {
    ctx.state = {
      flash: ctx.flash,
      isSignedIn: () => ctx.session.userId !== undefined,
    };
    await next();
  });

  app.use(
    serve(path.join(__dirname, '..', 'public')),
  );

  app.use(koaLogger());
  const router = new Router();
  addRoutes(router);

  app
    .use(router.allowedMethods())
    .use(router.routes());

  const pug = new Pug({
    viewPath,
    noCache: process.env.NODE_ENV === 'development',
    basedir: viewPath,
    helperPath: [
      { urlFor: (...args) => router.url(...args) },
    ],
  });

  pug.use(app);

  return app;
};
