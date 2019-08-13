import Koa from 'koa';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Welcome to task manager';
});

app.listen(port, () => {
  console.log(`Server started on port ${port}.\n`);
});
