import dotenv from 'dotenv';
import Koa from 'koa';
import Rollbar from 'rollbar';

dotenv.config();
const port = process.env.PORT;

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Welcome to task manager';
});

app.listen(port, () => {
  rollbar.log(`Server started on port ${port}.\n`);
});
