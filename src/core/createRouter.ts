import createRouter, { Route, Router } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import loggerPlugin from 'router5-plugin-logger';

const routes: Route[] = [
  { name: 'roulette', path: '/roulette' },
];

export default function configureRouter(): Router {
  const router =  createRouter(
    routes,
    {
      defaultRoute: 'roulette'
    });
    // Plugins
    router.usePlugin(loggerPlugin);
    router.usePlugin(
      browserPlugin({
        useHash: true
      })
    );

  router.start('/roulette');

  return router;
}
