import _ from 'lodash';

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
      await ctx.render('users/new', { f: buildFormObj(user) });
    })
    .get('currentUser', '/users/current', async (ctx) => {
      const { userId: id } = ctx.session;
      const user = await User.findOne({
        where: {
          id,
        },
      });
      await ctx.render('users/current', { f: buildFormObj(user) });
    })
    .post('users', '/users', async (ctx) => {
      const {
        request: {
          body: { form },
        },
      } = ctx;
      const user = User.build(form);
      try {
        await user.save();
        ctx.flash.set('User has been created');
        await ctx.redirect(router.url('root'));
      } catch (e) {
        await ctx.render('users/new', { f: buildFormObj(user, e) });
      }
    })
    .patch('users', '/users', async (ctx) => {
      const { userId: id } = ctx.session;
      const {
        request: {
          body: { form },
        },
      } = ctx;
      const user = await User.findOne({
        where: {
          id,
        },
      });
      _.assign(user, form);
      try {
        await user.save();
        ctx.flash.set('User info has been updated');
        await ctx.redirect(router.url('currentUser'));
      } catch (e) {
        await ctx.render('users/current', { f: buildFormObj(user, e) });
      }
    })
    .delete('users', '/users', async (ctx) => {
      const { userId: id } = ctx.session;
      const user = await User.findOne({
        where: {
          id,
        },
      });
      try {
        await user.destroy();
        ctx.session = {};
        ctx.flash.set('User has been deleted');
        await ctx.redirect(router.url('root'));
      } catch (e) {
        ctx.flash.set('Unable to remove user');
        await ctx.render('users/current', { f: buildFormObj(user, e) });
      }
    });
};
