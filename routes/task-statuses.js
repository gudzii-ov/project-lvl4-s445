// import buildFormObj from '../lib/formObjectBuilder';
import { TaskStatus } from '../models';

export default (router) => {
  router
    .get('taskStatuses', '/task-statuses', async (ctx) => {
      const statuses = await TaskStatus.findAll();
      await ctx.render('statuses', { statuses });
    });
};
