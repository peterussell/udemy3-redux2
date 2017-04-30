import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

/* BrowserRouter is the code which interacts with the history library.
   Specifically, *Browser*Router means inspect the entire URL.

   Route is the workhorse of react-router. It's a React component which
   can be rendered inside any other React component. The purpose is to
   provide configuration to say 'if the URL looks like abc, show component
   x.' */
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class Hello extends React.Component {
  render() { return <div>Hello!</div> }
}

class Goodbye extends React.Component {
  render() { return <div>Goodbye!</div> }
}

/* To wire up react-router, we replace the <App /> instance (previously
   between <Provider></Provider>) with an instance of BrowserRouter.

   Each route requires two props: the path to match, and the component
   to display for a matching path.

   Because the BrowserRouter is just a component, we can render anything
   else inside it as well as the Route components. For example, if we
   always want to a show a header, we just include it above the (optional,
   matched) routes. */
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        This is a header
        <Route path="/hello" component={Hello} />
        <Route path="/goodbye" component={Goodbye} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
