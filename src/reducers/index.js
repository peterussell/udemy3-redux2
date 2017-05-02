import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import PostsReducer from './reducer_posts';

/* For redux-form to work, we need to import it and hook it up to our
   reducer inside combineReducers. It's *required* to have the key
   'form'. */
const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
