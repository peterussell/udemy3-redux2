import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';

/* IndexRoute: the motivation for IndexRoute is that we always want to render
   the App component for "/", which allows us to do things like add headers,
   footers, and other styling which are always shown independently of any
   other components.
   IndexRoute is a feature of react-router which is rendered whenever the
   route matches the parent, but none of its (nested) child routes. */
export default (

  /* What we're saying here:
      > if the route is /, show App, and show PostsIndex
      > if the route is anything else, show App and the related Component
     It essentially allows us to use App as a way to provide constant formatting
     to the page, but still have a child component inside it when we just
     want to match '/'. */
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
  </Route>
);
