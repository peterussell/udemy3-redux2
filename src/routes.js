import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';

const Greeting = () => {
  return <div>Hey there!</div>;
};

export default (
  // Whenever the URL is '/', show the component 'App'
  // This is a *Nested Route* - the Greeting component is *nested* inside
  // the App component. Therefore, App needs to render the Greeting component.
  // If App doesn't render Greeting, then Greeting won't be displayed.
  // Greeting (in each case) gets passed to app as a prop.children, therefore
  // it can be used in the App component as this.props.children.
  <Route path="/" component={App}>
    <Route path="greet" component={Greeting} />
    <Route path="greet2" component={Greeting} />
    <Route path="greet3" component={Greeting} />
  </Route>
);
