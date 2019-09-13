import welcome from './welcome';
import users from './users';

const routes = [welcome, users];

export default (router, container) => routes.forEach((f) => f(router, container));
