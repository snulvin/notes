import * as React from 'react';
import * as ReactDOM from 'react-dom';
import'node_modules/bootstrap/dist/css/bootstrap.css';
import'node_modules/bootstrap/dist/css/bootstrap-reboot.css';
import'./index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
