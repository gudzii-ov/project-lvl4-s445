import buildFormObj from '../lib/formObjectBuilder';
import { encrypt } from '../lib/secure';
import { User } from '../models';

export default (router) => {
  router
    .get('newSession', '/session/new', async (ctx) => {
      const data = {};
      await ctx.render('sessions/new', { f: buildFormObj(data) });
    })
    .post('session', '/session', async (ctx) => {
      const { email, password } = ctx.request.body.form;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user && user.passwordDigest === encrypt(password)) {
        ctx.session.userId = user.id;
        await ctx.redirect(router.url('root'));
        return;
      }

      ctx.flash.set('email or password were wrong');
      await ctx.render('sessions/new', { f: buildFormObj({ email }) });
    })
    .delete('session', '/session', async (ctx) => {
      ctx.session = {};
      await ctx.redirect(router.url('root'));
    });
};
