import welcome from './welcome';
import users from './users';
import sessions from './sessions';
import taskStatuses from './task-statuses';

const routes = [welcome, users, sessions, taskStatuses];

export default (router, container) => routes.forEach((f) => f(router, container));
