import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      /* Lodash has a helper called 'omit', which will delete any matching
         key value pairs from the state object. */
      _.omit(state, action.payload);
    case FETCH_POSTS:
      /* We want to transform from [post1, post2] to
         [1: { post1 }, 2: { post2 }].

         The lodash library provides mapKeys, which takes an array and a
         property in each array object, and turns that property into a key
         for each object. */
      return _.mapKeys(action.payload.data, 'id');
    case FETCH_POST:
      const post = action.payload.data;

      /* ES5 version: */
      /* const newState = { ...state }
      newState[post.id] = post;
      return newState; */

      /* ES6 version: */
      return { ...state, [action.payload.data.id]: action.payload.data }
      /* [action.payload.data.id] is called 'key interpolation' - means
         'create a new key called action.payload.data.id', and assign a
         value to it of action.payload.data' */
    default:
      return state;
  }
}
