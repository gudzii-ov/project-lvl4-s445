import buildFormObj from '../lib/formObjectBuilder';
import { User } from '../models';

export default (router) => {
  router
    .get('users', '/users', async (ctx) => {
      const users = await User.findAll();
      await ctx.render('users', { users });
    })
    .get('newUser', '/users/new', async (ctx) => {
      const user = User.build();
      console.log(user);
      await ctx.render('users/new', { f: buildFormObj(user) });
    })
    .post('users', '/users', async (ctx) => {
      const { request: { body: form } } = ctx;
      const user = User.build(form);
      try {
        console.log('saving user');
        await user.save();
        console.log('prepare message');
        await ctx.flash.set('User has been created');
        console.log('redirecting');
        await ctx.redirect(router.url('root'));
      } catch (e) {
        await ctx.render('users/new', { f: buildFormObj(user, e) });
      }
    });
};
