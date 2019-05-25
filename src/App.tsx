import * as React from 'react';
import { RouteNode } from 'react-router5';
import { Route } from 'router5';

import NotFoundPage from './notFound/NotFoundPage';
import RoulettePage from './roulette/RoulettePage';

interface IAppProps {
  route: Route
}

const App: React.FunctionComponent<IAppProps> = ({ route }) => {
  const currentRouteName = route.name.split('.')[0];

  if (currentRouteName === 'roulette') {
    return <RoulettePage />;
  }

  return <NotFoundPage />;
};

export default () => (
  <RouteNode nodeName="">
      {({ route }) => <App route={route} />}
  </RouteNode>
);
