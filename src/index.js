import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

/* BrowserRouter is the code which interacts with the history library.
   Specifically, *Browser*Router means inspect the entire URL.

   Route is the workhorse of react-router. It's a React component which
   can be rendered inside any other React component. The purpose is to
   provide configuration to say 'if the URL looks like abc, show component
   x.' */
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

/* To wire up react-router, we replace the <App /> instance (previously
   between <Provider></Provider>) with an instance of BrowserRouter.

   Each route requires two props: the path to match, and the component
   to display for a matching path.

   Because the BrowserRouter is just a component, we can render anything
   else inside it as well as the Route components. For example, if we
   always want to a show a header, we just include it above the (optional,
   matched) routes.

   The Switch component prevents React Router from matching multiple
   routes at the same time (and therefore displaying multiple components).
   React Router behaves in a kind of unexpected way without it, due to
   fuzzy matching of routes. NB. for it to work, we put the **most specific**
   component first (which is why ''/posts/new' is above '/'). */
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
