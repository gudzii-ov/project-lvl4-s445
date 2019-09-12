import welcome from './welcome';
import users from './users';

const routes = [welcome, users];

export default (router) => routes.forEach((f) => f(router));
