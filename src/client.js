import React from 'react';
import { hydrate } from 'react-dom';

const root = document.getElementById('root');

const App = () => {
  return <h1>Hello from React</h1>;
};

hydrate(<App />, root);

if (module.hot) {
  module.hot.accept();
}
