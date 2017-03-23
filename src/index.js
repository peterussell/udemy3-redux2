import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

/* BrowserHistory is one of three history libraries we can use (note: this
   is different to the 'history' component bundled with react-router).
    > BrowserHistory is concerned with the URL *after* the protocol,
      eg. http://www.blog.com/posts/5 = if /posts/5/ changes then we tell
      react-router about it
    > HashHistory, concerned with the part after a hash in the URL,
      eg. http://www.blog.com/posts/5#something = if 'something' changes, then
      we tell react-router about it
    > MemoryHistory, doesn't really use the URL at all (further reading) */
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

/* To wire up react-router, we replace the <App /> instance (previously
   between <Provider></Provider>) with an instance of react-router. */
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
