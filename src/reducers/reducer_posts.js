import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      /* We want to transform from [post1, post2] to
         [1: { post1 }, 2: { post2 }].

         The lodash library provides mapKeys, which takes an array and a
         property in each array object, and turns that property into a key
         for each object. */
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
