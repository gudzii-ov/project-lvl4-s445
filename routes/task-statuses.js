import buildFormObj from '../lib/formObjectBuilder';
import { TaskStatus } from '../models';

export default (router) => {
  router
    .get('taskStatuses', '/statuses', async (ctx) => {
      const statuses = await TaskStatus.findAll();
      await ctx.render('statuses', { statuses });
    })
    .get('newStatus', '/statuses/new', async (ctx) => {
      const status = TaskStatus.build();
      await ctx.render('statuses/new', { f: buildFormObj(status) });
    })
    .post('taskStatuses', '/statuses', async (ctx) => {
      const {
        request: {
          body: { form },
        },
      } = ctx;
      const status = TaskStatus.build(form);
      try {
        await status.save();
        ctx.flash.set('New status created');
        await ctx.redirect(router.url('taskStatuses'));
      } catch (e) {
        await ctx.render('statuses/new', { f: buildFormObj(status, e) });
      }
    });
};
