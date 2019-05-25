import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import App from './App';
import createRouter from './core/createRouter';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

const router = createRouter();

ReactDOM.render(
  <RouterProvider router={router}>
     <App />
  </RouterProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
