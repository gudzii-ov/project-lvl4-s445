import welcome from './welcome';

const routes = [welcome];

export default (router) => routes.forEach((f) => f(router));
